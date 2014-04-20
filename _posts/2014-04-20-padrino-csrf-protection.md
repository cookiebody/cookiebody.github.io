---
layout: post
title:  "Padrino中如何防范CSRF"
date:   2014-04-20 21:40:00
---
[CSRF（Cross Site Request Forgery, 跨站请求伪造）](http://en.wikipedia.org/wiki/Cross-site_request_forgery)是web中常见攻击方式之一，作为开发者，可以使用以下三种方法，来防范此类攻击：

1.  验证 HTTP Referer 字段
2.  在请求参数中添加token并验证；
3.  在 HTTP 头中自定义属性并验证

在方法1中，是通过验证请求来源网址，在web server中进行设置即可，例如在[nginx中](http://nginx.org/en/docs/http/ngx_http_referer_module.html)：
{% highlight c %}
valid_referers *.example.com example.*;
if ($invalid_referer) {
    return 403;
}
{% endhighlight %}
这种方法应用简单，但Referer字段易被篡改，不推荐使用。

目前主流web开发框架，都包含方法2和3的实现。下面主要说下，在Padrino框架中，如何更好应对CSRF。Padrino基于Rack开发，它使用Rack的middleware：[rack-protection](https://github.com/rkh/rack-protection)，实现CSRF token的生成和验证。

在Padrino中启用CSRF保护很简单:
{% highlight ruby %}
# app.rb中
enable :sessions
enable :protect_from_csrf
# 排除一些action的验证
#set :protect_from_csrf, :except => ["/a", %r{^/a.c$}]
# 更改默认的authenticity_param名称
#set :protect_from_csrf, :authenticity_param => 'foobar'
{% endhighlight %}
更多使用方法，可参考Padrino的CSRF相关[单元测试](https://github.com/padrino/padrino-framework/blob/master/padrino-core/test/test_csrf_protection.rb)。

Padrino的CSRF token存储在session中:
{% highlight ruby %}
session[:csrf]
{% endhighlight %}
如使用页面模板，可通过Padrino的form生成辅助方法，如form_for，form_tag，在form里自动生成token标签：
{% highlight html %}
<input name="authenticity_token" value="0411707c00d956313624af3857134813" type="hidden">
{% endhighlight %}
如果使用Ajax，则可将token写入cookie中：
{% highlight ruby %}
response.set_cookie('XSRF-TOKEN',
                                :path => '/',
                                :value => session[:csrf],
                                :expires => Time.now + 3600*24) if session[:csrf]
{% endhighlight %}
一些前端框架，例如AngularJS，会自动检测名为XSRF-TOKEN的cookie，如果存在，就会在Ajax请求中，添加自定义HTTP头:HTTP-XSRF-TOKEN，存储CSRF-TOKEN。如果使用框架不支持这种默认机制，那就需要自行开发，可通过自定义HTTP头存储TOKEN，也可以使用参数存储。

不过，在rack-protection中，CSRF的HTTP头名只认：HTTP-X-CSRF-TOKEN，无法通过配置更改。在使用自定义HTTP头的方法时，要注意保持一致。AngularJS默认的HTTP头是：HTTP-X-XSRF-TOKEN，会导致请求非法, 要注意在AngularJS中修改下。
如果用nginx做反向代理，要把自定义的HTTP头传到Padrino的环境里：
{% highlight ruby %}
proxy_set_header X-CSRF-TOKEN $http_x_xsrf_token;
{% endhighlight %}

此外，由于Padrino的session默认是存储在内存，如果应用跑在多台服务器，请求可能会被分配到任意台机器，那就需要统一session存储，例如，可以将[session存储在mongodb](https://github.com/migrs/rack-session-mongo)。

![Alt Message](https://raw.github.com/mattnorris/whispernote/gh-pages/assets/img/whispernote-github-wiki-banner.jpg)