---
layout: post
title:  "PostgreSql的异步操作接口，以及ruby中对应实现"
date:   2014-09-03 22:59:00
---
我们团队一直在用padrino框架做开发，数据库操作，是用sequel这个轻量级库。
在开发中遇到数据IO的瓶颈，就想把数据库操作改为异步的，来提升代码性能。

原以为sequel默认都是同步方式来操作数据库，但看了源码和说明，才发现sequel默认都是在用异步接口：

![sequel]({{ site.url }}/assets/sequel1.png)
![sequel]({{ site.url }}/assets/sequel2.png)
那为啥在使用过程中，一点都没感到异步的快感？

于是就扒了一下sequel依赖的那些库：

![sequel]({{ site.url }}/assets/sequel3.png)

libpq，是Pg官方提供的操作接口代码库，C写的；

ruby-pg，是用ruby和C写的gem，实现对libpq的拓展，从而实现ruby对Pg的操作接口；

sequel，是ruby写的轻量级ORM，它实现了数据库连接管理，以及sql的生成。涉及数据库接口方面工作，都是依赖ruby-pg。

libpq本身，确实支持同步和异步两种操作方式：
[libpq-async](http://www.postgresql.org/docs/current/static/libpq-async.html)

一个数据库连接，就是一条TCP连接，libpq是客户端，Pg是服务端，

同步方式，libpq将指令发送到Pg，Pg指令执行完成，将结果发回，libpq收到结果后，才继续执行下面的代码：

![PQexec]({{ site.url }}/assets/pqexec.png)

异步方式，libpq只是把指令发送到Pg，返回发送结果的标志，想要获取执行结果，需要自己去轮询：

![PQsendQuery]({{ site.url }}/assets/pqsendquery.png)

下面看看ruby-pg：[ruby-pg](https://github.com/ged/ruby-pg)

ruby-pg对Pg的操作，是依赖libpq实现的，其中也包含异步操作接口。

但是，经过ruby-pg的封装，异步接口，已经和同步效果一样，看代码：

[ruby-pg#pg_connection](https://github.com/ged/ruby-pg/blob/master/ext/pg_connection.c#L3034)
![ruby-pg]({{ site.url }}/assets/ruby-pg1.png)

[ruby-pg#pg_connection](https://github.com/ged/ruby-pg/blob/master/ext/pg_connection.c#L2997)

![ruby-pg]({{ site.url }}/assets/ruby-pg2.png)

可以看到，在send_query之后，紧接着，就实现了一个轮询方法，

去get_result，这个轮询会导致调用程序阻塞，直到获得返回结果。

使用Pg中的pg_sleep(seconds)来模拟指令执行，通过代码来验证：

![ruby-pg-test]({{ site.url }}/assets/ruby-pg-test.png)

结果exec和async_exec都在10秒后结束，异步和同步的函数，确实都会阻塞ruby的解释器。

也就是说，想要在ruby实现对Pg的异步操作数据库，ruby-pg本身不支持。

还是要自己实现个libpq的拓展，就把ruby-pg中那个轮询的循环去掉就行。

不过，找到问题原因后，就没打算在ruby中实现Pg的异步支持，

如果把ruby-pg的async_exec函数改为异步的，会带来更多问题，毕竟sequel就是只用这个函数的。

而且，有异步，就想要有回调，但在MRI中实现，比较折腾，使用场景也不多。

我们的问题，后来通过应用队列来解决：sidekiq+redis。