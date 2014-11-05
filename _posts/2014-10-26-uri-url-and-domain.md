---
layout: post
title: "开发人员需要了解的网址知识"
date: 2014-10-26 21:05:00
---
中文语境中，网址就是指网站地址。用工程语言准确描述的话，应该是httpurl(用于http协议的资源定位符)。

其中，HTTP是一种传输协议，在[rfc2616](http://tools.ietf.org/html/rfc2616)有HTTP的标准描述，URL是资源定位符，是隶属于URI中的子集，在[rfc3986](http://tools.ietf.org/html/rfc3986)有URI的标准描述。


关于url和uri之间的区分，有个很形象的比喻：


> **chris**

> 这是我的名字，它是我个人的标识。它就像URI，但不是URL，因为，没有地址信息，你没法只通过名字找到我，世界上有太多叫chris的人。

> **深圳市，南山，马家龙113号**

> 这是我的地址，它是一个物理建筑的标识。它既是URL也是URI（因为所有URL都属于URI）。把地址和姓名结合起来，那就可以标识地球上唯一的chris。


网址主要是由协议部分(HTTP或HTTPS)，域名(`example.com`)部分，路径(`/blog/blog_id`)三大部分组成。下面针对这三部分，总结一下，开发人员需留意的5个方面：


* 强制全站HTTPS

HTTPS是HTTP和SSL/TLS两种协议的组合，默认使用443端口。如果网站部署了SSL证书，如果强制要让所有请求，都通过HTTPS传输，那要对web server进行配置，将HTTP的请求，转向到HTTPS，浏览器不会自动帮你做的。

* 域名的DNS解析

当购买了新的域名，去DNS设置将域名解析到服务器时，要注意设置带`www`的子域名。比如`example.com`是你的域名，那么在DNS中，`@`就指根域名，而`www.example.com`就是需要添加解析的第一个子域名。

* 域名结尾的斜杠

在URI的标准中，域名结尾的斜杠(`\`)，并非无所谓，比如`http://e.cn/path`，其中'/path'就是这个URI的路径；而`http://e.cn/nopath/`这个URI是不带路径的，这在之前解释[URI.join函数](http://cookiebody.github.io/2014/10/22/ruby-uri-join.html)时作了说明。但是在web开发中，`request.path`通常会返回域名后的所有文本内容。

* 网址能否包含中文

在URI的标准中，没有明确字符集的标准，在当前的标准里，URI中的字符仅限ASCII中的字符。所以，严格按照标准实现的URI库，比如ruby的`URI.join`中，参数如包含中文，就会报错。不过，只要避免用URI标准的库，用中文作为网址参数，也可以的，但要注意[url encode](http://blog.ericsk.org/archives/1423)的问题。

* 关于网址长度限制

在HTTP协议和URI的标准中，都没有规定网址的最大长度。在server端，可以指定自己能处理的最大长度，一旦超过此长度，可以返回414(Request URI too long)。另外一个网址长度限制，是在浏览器端，[不同浏览器](http://www.boutell.com/newfaq/misc/urllength.html)对URI支持长度不一。比较稳妥的方式，是控制网址长度，在2000个字符以内。