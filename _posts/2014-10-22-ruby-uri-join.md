---
layout: post
title: "ruby中的URI.join实现"
date: 2014-10-22 19:00:00
---
在web应用中，经常需要拼接url。
可以用字符串直接拼接：
{% highlight ruby %}
url = 'http://t.cn' + '/' + 'some_string'
{% endhighlight %}
如果url的所有部分，都是明确的，用字符串的拼接方式直观且方便。

但是，如果url中，有些部分是从变量获取，那最好还是用标准的url合并方法[URI.join](http://www.ruby-doc.org/stdlib-2.1.3/libdoc/uri/rdoc/URI.html#method-c-join)：
{% highlight ruby %}
url = URI.join(model.base_part, '/path').to_s
{% endhighlight %}
URI.join会对参数合法性进行验证，确保输出是准确格式的url，避免粗心带来问题，比如忘记以http开头。

在刚开始用URI.join时，发现在有些情况下，输出结果和预期不一样：
{% highlight ruby %}
url = URI.join('http://t.cn', '/path', 'another').to_s
{% endhighlight %}
预期结果，是输出：http://t.cn/path/another，但实际输出是：http://t.cn/another。中间的那个参数没了。

最初还以为join函数有bug，再仔细对比下文档中的示例，发现要把'/path'写成'/path/'(以斜杠结尾)，才能输出预期结果。

这时才意识到，URI.join的内部实现，并不是简单的字符串拼接。

查一查[URI.join的源码](https://github.com/ruby/ruby/blob/trunk/lib/uri/rfc3986_parser.rb#L71)：
{% highlight ruby %}
def join(*uris) # :nodoc:
  uris[0] = convert_to_uri(uris[0])
  uris.inject :merge
 end
{% endhighlight %}
可以看到，第一个参数会转化成为uri对象，后面的参数，会被merge到那个uri对象。

查看[merge代码实现](https://github.com/ruby/ruby/blob/trunk/lib/uri/generic.rb#L1101)，发现中间的'/path'，是在[下面这里](https://github.com/ruby/ruby/blob/trunk/lib/uri/generic.rb#L1005)被清除了：
{% highlight ruby %}
if (first = rel_path.first) and first.empty?
  base_path.clear #<-------这里
  rel_path.shift
end
{% endhighlight %}

最初，以为是代码实现有误。直觉上，要合并url，就应把所有参数都join起来。
但是上面的实现，会导致那些结尾没斜杠('/')的参数被移除。

再仔细看看代码，发现里面的注释，经常会带上RFC的内容：
{% highlight ruby %}
# RFC2396, Section 5.2, 6), a)
{% endhighlight %}

这才想到，这种url的合并规则，也许是对应RFC标准制定的。

查看了[RFC2396](https://www.ietf.org/rfc/rfc2396.txt#5.2)以及[RFC3986](https://www.ietf.org/rfc/rfc3986.txt#5.2.3)，这两个版本中，都制定了url合并的逻辑：要把源url中的path全部清空，再把目标的path设置为新的path。

虽然在浏览器中，url结尾的那个斜杠有没有无所谓。
但在使用URI.join合并url时，结尾的斜杠很重要:
{% highlight ruby %}
# 是path，合并后会被覆盖
with_no_splash = '/this_is_path'
# path为空，合并无影响
with_splash = '/no_path/'
{% endhighlight %}