---
layout: post
title: "postgresql的自增序列及自定义实现"
date: 2014-10-25 21:05:00
---
自增序列，在关系型数据库中，常用来做主键。在postgresql中，自增序列有两种类型：serial和bigserial，都是从1开始计数，serial是4字节，bigserial是8字节。


如果有个名为User的model，它的id字段是serial类型，在[sequel](https://github.com/jeremyevans/sequel)中可以这么代码：


{% highlight ruby %}
DB.transaction do
  user = User.new(:name => 'tom')
  user.save
  friend = Friend.new(:uid => user.id)
  friend.save
end
{% endhighlight %}


在上面的示例代码中，事务还没提交，就可以取到自增的id值。为什么是这样？


原因是postgresql中的自增函数[netxval](http://www.postgresql.org/docs/9.4/static/functions-sequence.html)，不受事务影响：

> Important: To avoid blocking concurrent transactions that obtain numbers from the same sequence, a nextval operation is never rolled back; that is, once a value has >been fetched it is considered used, even if the transaction that did the nextval later aborts. This means that aborted transactions might leave unused "holes" in the >sequence of assigned values.


如果不用系统自带的自增类型，而是实现自定义的自增逻辑，要怎么做？


首先，我们需要一个表key_gen，来记录自增序列的值：


{% highlight ruby %}
CREATE TABLE key_gen
(
  -- 唯一标识
  unique_id character varying(255) NOT NULL,
  -- 下次使用的序列值
  next_key integer NOT NULL DEFAULT 1,
  CONSTRAINT key_gen_pkey PRIMARY KEY (unique_id)
)
{% endhighlight %}


再写个函数nextkey实现取自增的值：


{% highlight ruby %}
CREATE OR REPLACE FUNCTION gen_key(uid text)
  RETURNS record AS
$BODY$
DECLARE
  res_key integer;
  ret RECORD;
BEGIN
  SELECT INTO res_key
            next_key
  FROM "key_gen" WHERE ("unique_id" = $1) LIMIT 1 FOR UPDATE;
  UPDATE "key_gen" set "next_key" = ("next_key" + 1) WHERE ("id" = $1);
  ret := (res_key);
  RETURN ret;
  COMMIT;
END;
$BODY$
{% endhighlight %}


上面的nextkey实现中，有两个地方需要注意：

* SELECT...FOR UPDATE会开启独占的行索，直到本次事务提交，才会释放
* COMMIT会提交本次事务，使得函数本身执行，不受外部的事务影响


在上面逻辑的基础上，可以实现不同类型的自增，比如加字母前缀，自增的值不为1等。