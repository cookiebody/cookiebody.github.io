---
layout: post
title: "多线程应用才有必要用连接池"
date: 2014-12-22 23:05:00
---
以前在写数据库操作的代码，都是按常规，配置连接池的连接数量，没出过问题，也没留意过连接池的实现方式。

在看sequel的源码时，注意看了[连接池的实现](https://github.com/jeremyevans/sequel/blob/master/lib/sequel/connection_pool/threaded.rb#L88)，原来，是通过线程的ID，来管理对应数据库连接。看明白后，才意识到，之前有滥用连接池的情况。

在unicorn这种进程型app server中，连接池是没用的:

unicorn是在进程中处理请求，请求是在进程逐个执行。当然，也可以开启多个worker，unicorn会通过fork的方式，创建新的进程，但每个进程，同一时间，只能处理一个请求。那也就意味，在任意时间，一个进程中，只用到一个数据库连接。

而在puma这个app server中，就不太一样:

puma是在线程中处理请求的，一个进程可以开启多个线程，同时处理多个请求。这时，要确保连接池的连接数，大于等于puma中的线程数量，才能达到理想的并发效果。

可以通过代码，来模拟两种app server的执行方式。

数据库连接：

{% highlight ruby %}
require 'sequel'
DB = Sequel.postgres(:host => '127.0.0.1',
                     :user => 'user',
                     :password => 'password',
                     :database => 'postgres',
                     :max_connections => 5,
                     :pool_timeout => 5,
                     :servers=>{:read_only=>{:host=>'127.0.0.1'}})
{% endhighlight %}

进程型执行方式：

{% highlight ruby %}
(1..10).each do |a|
  DB.run("select pg_sleep(3);")
end
{% endhighlight %}

线程型执行方式：

{% highlight ruby %}
all_threads = []
(1..10).each do |a|
  t = Thread.new do
    DB.run("select pg_sleep(3);")
  end
  all_threads << t
end

all_threads.each do |t|
  t.join
end
{% endhighlight %}

可以通过sql语句，查看数据库连接：

{% highlight ruby %}
SELECT query,pid FROM pg_stat_activity where client_addr='127.0.0.1';
{% endhighlight %}

虽然配置连接池的容量是5，但在进程型中，只会看到一条连接；而线程型会把连接池填满，用了5个数据库连接。

在估算生产系统的数据库连接时，要注意对线程和进程应用的统计区分。比如，unicorn是一个worker使用一个连接，而sidekiq和puma，是一个线程使用一个连接。