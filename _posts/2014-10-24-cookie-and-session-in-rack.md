---
layout: post
title: "rack中的cookie和session"
date: 2014-10-24 22:00:00
---
![cookie-in-real]({{ site.url }}/assets/cookie-in-real.png)![session-in-real]({{ site.url }}/assets/session-in-real.png)


cookie本意是饼干，session本意是会议。这两个词，在web开发中很常见，但和本意完全不同。


简单来说，cookie就是存在浏览器里面的内容，session一般是在浏览器和服务端都存内容。


ruby的众多web开发框架，都是基于rack这个库，cookie和session的支持都在rack中实现。


![session-in-real]({{ site.url }}/assets/rack-logo.png)


rack中的cookie写操作，是在[response中实现](https://github.com/rack/rack/blob/master/lib/rack/response.rb#L60)；读操作是在[request中实现](https://github.com/rack/rack/blob/master/lib/rack/request.rb#L295)。


写cookie的示例如下：


{% highlight ruby %}
response.set_cookie( #设置cookie名称
                     "user_email",
                     # 允许访问的路径
                     :path => '/',
                     # 允许访问的域名
                     :domain => '.example.com',
                     # 设置cookie的内容
                     :value => 'user@example.com',
                     # 设置2小时以后失效
                     :expires => Time.now + 7200)
{% endhighlight %}


要留意涉及cookie访问范围的属性：path和domain，上面示例中的设置，允许example.com及其所有子域名访问user_email这个cookie。


读取cookie内容的示例如下：


{% highlight ruby %}
request.cookies["user_email"].to_s
{% endhighlight %}


rack中session的实现，离不开cookie的支持。


rack中的session，叫cookie-based-session，可以理解为key-value存储，在浏览器中，用cookie存key值，在服务端存对应value的值，这个整体就叫session。


rack中session的[读操作](https://github.com/rack/rack/blob/master/lib/rack/session/abstract/id.rb#L59)和[写操作](https://github.com/rack/rack/blob/master/lib/rack/session/abstract/id.rb#L72)，封装在**id.rb**这个基类中。


在rack中使用session：


{% highlight ruby %}
# 将user_id存储到session
session['user_id'] = '1234'
# 从session读取user_id
user_id = session['user_id'].to_s
{% endhighlight %}


在设置rack的session时，rack帮开发者做了两次存储：


1. 服务端hash存储，生成唯一的session_id作为key，session值为value
2. 浏览器端cookie存储，名为rack.session，值为上一步的session_id


在读取session数据时，就是把上面两步颠倒，先读cookie，再读hash。


session在浏览器端只有一种基于cookie的存储，但在服务端的存储方式有很多，rack实现以下三种：


* [cookie.rb](https://github.com/rack/rack/blob/master/lib/rack/session/cookie.rb)

这种是默认支持的存储方式，session的值存在hash变量中:

![session-in-real]({{ site.url }}/assets/hash-session.png)

* [memcache.rb](https://github.com/rack/rack/blob/master/lib/rack/session/memcache.rb)

将session值存入memcache中：

![session-in-real]({{ site.url }}/assets/memcache-session.png)

* [pool.rb](https://github.com/rack/rack/blob/master/lib/rack/session/pool.rb)

将session值存存多线程共享的hash变量中：

![session-in-real]({{ site.url }}/assets/pool-session.png)


如果应用只是部署单台服务器，单进程的可以使用cookie.rb，多线程的可以使用pool.rb。


如果是部署多台服务器，那最好将session的值统一存储，可以使用rack默认支持的memcache存储，也可以使用基于[redis](https://github.com/roidrage/redis-session-store)和[mongo](https://github.com/migrs/rack-session-mongo)实现的共享存储。