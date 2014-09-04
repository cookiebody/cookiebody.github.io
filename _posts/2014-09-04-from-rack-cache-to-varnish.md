---
layout: post
title: "从rack-cache到varnish，200倍性能提升达成！"
date: 2014-09-04 19:00:00
---
![rack-cache-to-varnish]({{ site.url }}/assets/rack-cache-to-varnish.png)

使用ruby开发web应用之所以高效，ruby语法友好是一方面，另外一方面就是社区资源，涉及web应用场景的gem有很多。

比如连HTTP加速器[HTTP accelerator](http://en.wikipedia.org/wiki/Web_accelerator)这种产品，都有纯ruby的实现：[rack-cache](https://github.com/rtomayko/rack-cache)。

使用起来，难以置信的简单：

{% highlight ruby %}
require 'rack/cache'

use Rack::Cache,
  :verbose     => true,
  :metastore   => 'file:/var/cache/rack/meta',
  :entitystore => 'file:/var/cache/rack/body'

run app
{% endhighlight %}

我们的产品中，所有上传图片，都是存储在MongoDB，而且通过[rack-thumb](https://github.com/akdubya/rack-thumb)实现图片缩放功能，通过url中指定图片尺寸，就能获取对应尺寸的图片。

通过HTTP加速器，一种尺寸的图片，只需要生成一次，以后就从加速器的缓存中返回。

最初就是用简单的rack-cache来做HTTP加速，但很快就遇到瓶颈，

首先是性能，使用rack-cache后，配置为硬盘存储，测试响应性能，仅提升20%。将rack-cache的存储改为heap后，性能提升也不显著。

其次是拓展，rack-cache是rack的插件，必须跟着app走。部署多几台app，那它们之间的缓存是无法共享的，除非将存储改为Memcached，但是用内存来缓存静态资源，太奢侈！

所以总体来说，rack-cache性价比太低，在有规模的生产环境中用，很不划算。

所以不得已，还是要跳出ruby的圈子，找业内通用的方案，首选肯定是名气最大的[varnish](https://www.varnish-cache.org/)。
安装的是最新版v4.0，官方提供CentOS安装的rpm，所以安装很方便。

把存储配置为硬盘，测试响应性能，能带来200倍以上的性能提升，一个词来形容当时心情的话，那就是：惊喜。
通过对vcl的配置[vcl-backends](https://www.varnish-cache.org/docs/trunk/users-guide/vcl-backends.html)，支持多个app也很方便。

不过varnish的在转发request到app时，只有两种策略：循环和随机，没有类似nginx的负载均衡功能，不过这点缺失影响不大。

虽然rack-cache比较弱，但它有个优势:容易用。如果是小项目，可以先用，等遇到性能瓶颈，再升级方案，用varnish。

我们的SaaS产品友好速搭在内测期，用户数量是固定的，用了4台rack-cache。之后上线开放，发现性能跟不上，很快就换成varnish，配合一台处理缩略图的app。
部署varnish的那台机器，4000req/s的性能，应付1000rpm以内的压力，绰绰有余，此外，cpu和内存也都很稳定，果然名不虚传。