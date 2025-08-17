
(function () {

    console.log("如出现纰漏， 请发邮件或微信, 联系管理员修复bug。。。");

    console.log("微信：hobo2plipala");

    console.log("微信：hetui2plipala")

    console.log("Email: hebo.plipala@gmail.com");

    console.log("Email: hetui2plipala@gmail.com");


}());


String.prototype.TrimSpace = function () {

    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.Int = function () {

    return parseInt(this);
};

Event.prototype.Bubble = function (boolean) {

    if (boolean) {

    } else {

        if (this.stopPropagation) this.stopPropagation();
        if (this.preventDefault) this.preventDefault();

        this.cancelBubble = true;
        this.returnValue = false;
    }

};


Array.IsArray = function (array) {

    if (this.isArray) {

        return this.isArray(array)

    } else {

        return Object.prototype.toString.call(array) == "[object Array]"
    }
};

Object.prototype.Foreach = function (functor, self) {

    // functor: key / value / proto bool

    self = self || this;

    for (var key in self) {

        var proto = Object.prototype.hasOwnProperty.call(self, key);

        functor.call(self, key, self[key], proto);
    }
};


Document.prototype.QueryNode = function (pattern) {

};

Document.prototype.QueryElement = function (pattern, value) {

    // pattern
    // 1. Array  ["tagname", "#id", ".class", "[attribute]", ">", "+", "*"]
    // 2. String  tagname, name, id, classname
    // 3. String:Selector  "#id .class > taganame [attribute]"

    var htmNodeTuple, tuple;

    if (typeof pattern === "string") {

        switch (pattern) {

            case "tagname":

                if (this.getElementsByTagName) {

                    tuple = this.getElementsByTagName(value);

                    htmNodeTuple = new HtmNodeTuple(tuple);

                    return htmNodeTuple
                }

            case "name":

            case "id":

            case "classname":

            default:

        }

    } else {

        if (Array.IsArray(pattern)) {

            console.log("数组")

        }

    };

    // this.get

    // tuple.I(8)

    console.log(pattern)

};

Document.prototype.QueryComment = function (pattern) {

};

Document.prototype.QueryTextNode = function (pattern) {

};


Element.prototype.TagName = function () {

    var tagName = this.tagName.toLowerCase();

    tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1);

    return tagName

};

Element.prototype.QueryNode = function (pattern) {

};

Element.prototype.QueryElement = function (pattern) {

};

Element.prototype.QueryComment = function (pattern) {

};

function Module () {
    
}

Module.Audio = function () {

    Module.Audio.prototype.Play = function () {

        this.core.play();

        this.Attr.paused = this.core.paused;
    };

    Module.Audio.prototype.Stop = function () {

        this.core.pause();

        this.Attr.paused = this.core.paused;
    };

    Module.Audio.prototype.Pause = function (boolean) {

        if (!boolean) {

            this.core.play();

            this.Attr.paused = this.core.paused;

        } else {

            this.core.pause();

            this.Attr.paused = this.core.paused;
        }
    };

    Module.Audio.prototype.Muted = function (boolean) {

        this.core.muted = boolean;

        this.Attr.muted = boolean;
    };

    Module.Audio.prototype.Volume = function (volume) {

        this.core.volume = volume;

        this.Attr.volume = volume;
    };

    Module.Audio.prototype.Time = function (time) {

        this.core.currentTime = time;

        this.Attr.time = time;
    };

    Module.Audio.prototype.TimeUpdate = function (functor) {

        var self = this;

        this.core["ontimeupdate"] = function (event) {

            self.Attr.time = this.currentTime;

            if (self.Attr.Time == self.Attr.Duration) {

                this.paused = true;

                self.Attr.paused = true;
            }

            functor(event);
        };
    };


    // core 根据浏览器环境兼容

    var core = document.createElement("audio");

    this.core = core;

    this.Attr = {

        paused : true,

        muted : false,

        volume : 1.0,  //  0.0 -- 1.0

        duration : NaN,

        time : 0
    };

    var self = this;

    core["ondurationchange"] = function () {

        self.Attr.duration = this.duration;

        self.Attr.time = this.currentTime;
    };

    core["ontimeupdate"] = function () {

        self.Attr.time = this.currentTime;

        if (self.Attr.Time == self.Attr.Duration) {

            this.paused = true;

            self.Attr.paused = true;
        }
    };

    this.Attr.paused = core.paused;

    this.Attr.muted = core.muted;

    this.Attr.volume = core.volume;

};



function Attribute () {

}

Attribute.Exist = function (node, attrname) {

    if (node.hasAttribute) {

        return node.hasAttribute(attrname);
    }
};

Attribute.Remove = function (node, attrname) {

    if (node.removeAttribute) {

        return node.removeAttribute(attrname)
    }
};

Attribute.Update = function (node, attrname, value) {

    if (node.setAttribute) {

        return node.setAttribute(attrname, value)
    }
};

Attribute.Query = function (node, attrname) {

    if (node.getAttribute) {

        return node.getAttribute(attrname)
    }
};

function HtmNodeType () {

};

HtmNodeType.Document  = 0;
HtmNodeType.DocType   = 1;    // doctype 文档类型
HtmNodeType.Element   = 2;
HtmNodeType.Comment   = 3;
HtmNodeType.TextNode  = 4;
HtmNodeType.HetuiNode = 5;   // hetui framework    [[-  指令，运算，解析   ]]
HtmNodeType.ErrorNode = 6;

function Environment () {  // 环境信息

};


function Tuple (array) {

    Tuple.prototype.Push = function (value) {

        if (this.push) {

            this.push(value)

        } else {

        }
    };

    Tuple.prototype.Concat = function (tuple) {

        if (this.concat) {

            this.concat(tuple)

        } else {

            console.info("Tuple Concat Not Define");

            for (var i = 0; i < tuple.length; i++) {

                this[i] = tuple[i];
            }
        }
    };

    Tuple.prototype.Foreach = function (functor, self) {

        if (this.forEach) {

            self = self || this;

            this.forEach(functor, self)

        } else {


        }

    };

    Tuple.prototype.__proto__ = Array.prototype;

    var self = new Array ();

    self.__proto__ = Tuple.prototype;

    if (array) {

        self.tuple = array;

        for (var i = 0; i < array.length; i++) {

            self[i] = array[i];
        }

    } else {

        self.tuple = new Array;
    }

    return self;
};

function HtmNodeTuple (tuple) {

    HtmNodeTuple.prototype.Size = function () {

        return this.tuple.length;
    };

    HtmNodeTuple.prototype.HtmNode = function () {

        for (var i = 0; i < this.length; i++) {

            this[i] = new HtmNode(this[i]);
        }
    };

    HtmNodeTuple.prototype.__proto__ = Tuple.prototype;

    var self = new Tuple (tuple);

    self.__proto__ = HtmNodeTuple.prototype;

    return self;
}

function Signal () {

    // HtmNodeUpdate
    // ElementUpdate
}

function Cookie () {

}

function Class () {


}

Class.Functor = function () {

};

Class.Functor.Param = function (functor) {

    if (typeof functor == 'function') {

        var param = /[^(]+\(([^)]*)?\)/gm.exec(Function.prototype.toString.call(functor));

        if (param[1]) {

            return param[1].replace(/[^,\w]*/g, '').split(',');
        }
    }
};

Class.DurationToTime = function (format, duration) {   // "mm:ss"

    var time, zero;

    var H = format.match(/h+/g);

    if (H != null) {

        var h = parseInt( duration / 3600);

        for (var i = 0; i< H.length; i++) {

            zero = new Array(H[i].length - h.toString().length + 1).join("0");

            time = format.replace(H[i], zero + h);

            format = time;
        }
    }

    var M = format.match(/m+/g);

    if (M != null) {

        var m = parseInt(duration % 3600 / 60);

        for (var i = 0; i< M.length; i++) {

            zero = new Array(M[i].length - m.toString().length + 1).join("0");

            time = format.replace(M[i], zero + m);

            format = time
        }
    }


    var S = format.match(/s+/g);

    if (S != null) {

        var s = parseInt(duration % 3600 % 60);

        for (var i = 0; i< S.length; i++) {

            zero = new Array(S[i].length - s.toString().length + 1).join("0");

            time = format.replace(S[i], zero + s)

        }
    }

    return time;

};

Class.Property = function (obj) {

    var property = new Array;

    for (var name in obj) {

        if (Object.prototype.hasOwnProperty.call(obj, name)) {

            property.push(name)
        }
    }

    return property
};

function HtmNode (node) {

    // console.dir(node);

    // Parent, FirstChild, LastChild, PrevSibling, NextSibling *html.Node
    // Type      html.NodeType
    // Data      string
    // Attr      []html.Attribute

    if (typeof node == "string") {


    } else {

        switch (node.nodeType) {

            case Document.DOCUMENT_TYPE_NODE: case 10:

                this.Type = HtmNodeType.DocType;

                this.Node = node;

                break;

            case Document.ELEMENT_NODE: case 1:

                this.Type = HtmNodeType.Element;
                this.TagName = node.TagName();

                this.Node = node;

                this.Attribute = new Tuple();


                for (var i = 0; i < node.attributes.length; i++) {

                    this.Attribute.Push({
                        name : node.attributes[i].name,
                        value : node.attributes[i].value
                    })
                }

                break;

            case Document.TEXT_NODE: case 3:

                // this.Data = node.data.TrimSpace();

                this.Type = HtmNodeType.TextNode;

                this.Data = node.data;

                this.Node = node;

                break;

            case Document.DOCUMENT_NODE: case 9:

                this.Type = HtmNodeType.Document;

                this.Node = node;

                break;

            default:

                throw node

        }
    }
};

HtmNode.Children = function (node) {

    var tuple = node.childNodes;

    return HtmNodeTuple(tuple)
};

HtmNode.ChildNode = function (node) {


};

HtmNode.ChildElement = function (node) {


};

HtmNode.ChildTextNode = function (node) {


};

HtmNode.ChildComment = function (node) {


};


function Observer () {  // value array object

    Observer.prototype.publish = function (subject, observer) {

        // console.log(subject, observer, this);

        var object = this.Subject;

        // console.log(observer);

        var emitEvent = function (object) {

            for (var key in object) {

                if (Object.prototype.hasOwnProperty.call(object, key)) {

                    if ("@Observer::signal" == key) {

                        // console.log(object[key].length);

                        object[key].forEach(function (signal) {

                            // console.log(signal);

                            signal.Functor.apply(observer, signal.Param.tuple);
                        })

                    } else {

                        emitEvent(object[key]);
                    }
                }
            }

        };

        for (var i = 0; i < subject.length; i++) {

            var objkey = subject[i];

            if (subject.length == i + 1) {

                if (object) {

                    object = object[objkey];

                    emitEvent(object);
                }

            } else {

                object = object[objkey];
            }

            if (!object) return

        }

    };

    Observer.prototype.subscribe = function (subject, signal) {

        var object = this.Subject;

        // console.log(subject, signal);

        for (var i = 0; i < subject.length; i++) {

            var objkey = subject[i];

            if (subject.length == i + 1) {

                if (object[objkey]) {

                    object = object[objkey];

                    if (!object["@Observer::signal"]) {

                        object["@Observer::signal"] = new Array;
                    }

                } else {

                    object[objkey] = {};

                    object = object[objkey];

                    object["@Observer::signal"] = new Array;
                }

                object["@Observer::signal"].push(signal);

                // console.log(object["@Observer::signal"])

            } else {

                if (object[objkey]) {

                    object = object[objkey];

                } else {

                    object[objkey] = {};

                    object = object[objkey];
                }
            }
        }
    };

    Observer.prototype.withdraw = function (subject, signal) {

    };

    this.Source = Tuple();

    this.Listener = Tuple();

    // source listener == observer

    this.Subject = {};

    // subject ==  name, signal
    // signal == Type Param Functor Context This

    // Watcher 观察员
}


Observer.Proxy = function () {

    // ES6 Proxy
};

Observer.Timer = function () {

    // 定时器检测
};

Observer.Define = function (value) {

    /*

    0: defineProperty/defineProperties IE9+

    侵入式 低版本IE或其他不支持 封装取值赋值函数
    defineProperty/defineProperties

     configurable
     当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。
     默认为 false。

     enumerable
     当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。
     默认为 false。

    数据描述符还具有以下可选键值：


     value
     该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。
     默认为 undefined。

     writable
     当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值运算符改变。
    默认为 false。

    存取描述符还具有以下可选键值：


     get
     属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 this 对象（由于继承关系，这里的this并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。
    默认为 undefined。

     set
     属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 this 对象。
     默认为 undefined。

    In Internet Explorer 8, this was only supported on DOM objects and with some non-standard behaviors. This was later fixed in Internet Explorer 9.
    IE8 defineProperty方法 或 onpropertychange事件

    */

    var observe = function (object, field, observer) {

        var objkey = field [field.length - 1];

        // console.log(field);

        Object.defineProperty(this, objkey, {

            get : function () {

                // console.log("获取值");

                return value;
            },

            set : function (newvalue) {

                var subject = field;

                value = newvalue;

                // console.log("修改值", newvalue);
                //
                // console.log(subject, object);

                observer.publish(subject, object);
            }
        });

        return value
    };

    observe["@Hetui::observer"] = "存取器";

    return observe
};

Observer.Embed = function () {

    // 破坏式 取值赋值改为函数操作 fn() fn(value)

    // 破环时 旧值新值对比 脏值检测 订阅发布
    // 需要事件功能全部重新封装 或 调用检测处理

    // vbscript 低版本IE

};

Observer.Watch = function () {

    // 优先级 修饰访问 装饰器

    // 黑魔法 利用非兼容接口或废弃接口
    // vbscript 低版本IE5678
    // __defineGetter__/__defineSetter__  IE11
    // __lookupGetter__/__lookupSetter__  mozilla
    // Object.observe() 已废弃

};


function Network () {

}

Network.Form = function (config) {

    config = config || {};

    var option = config["option"] || {};
    var method = config['method'].toUpperCase() || "POST"; //默认为post
    var target = config['target'] || "_self"; //默认为当前页面

    var url = config.url; //提交地址


    var turnForm = document.createElement("form");
    document.body.appendChild(turnForm);

    turnForm.method = method;
    delete config['method'];

    turnForm.target = target;
    delete config['target'];

    turnForm.action = url;
    delete config['url'];

    //创建隐藏表单
    for(var item in config['data']){
        var newElement = document.createElement("input");
        newElement.setAttribute("type", "hidden");
        newElement.setAttribute("name", item);
        newElement.setAttribute("value", config['data'][item]);
        turnForm.appendChild(newElement);
    }

    turnForm.submit();
};

Network.Form.Encoded = function (option, url) {

    option = option || {};

    var data = "";

    option.Foreach(function (key, value, proto) {

        if (proto) {

            data = data + "&" + key + "=" + value
        }
    });

    data = data.substring(1);

    switch (url) {

        case undefined:

            return data;

        case "":

            return "?" + data;

        default:

            return url + "?" + data;
    }

};

Network.XHR = function(config) {

    //  option
    //  timeout  timeout

    config = config || {};
    config.data = config.data || {};

    var method = config.method.toUpperCase() || "GET";
    var async = config.async || true;

    var header = config["header"] || {};
    var option = config["option"] || {};

    var code = config.code || "form"; // form, json, xml,

    var xhr;

    try {
        // 兼容：Opera 8.0+, Firefox, Safari
        xhr = new XMLHttpRequest(); //创建XMLHttpRequest 对象

    } catch (e) {

        // 兼容：Internet Explorer 浏览器
        try {

            xhr = new ActiveXObject("Msxml2.XMLHTTP");

        } catch (e) {

            try {

                xhr = new ActiveXObject("Microsoft.XMLHTTP");

            } catch (e) {

                alert("哪来的老古董浏览器，我见了都得叫声叔！！！");

                return false;
            }
        }
    }

    xhr["onreadystatechange"] = function () {

        switch (xhr.readyState) {

            case 4 : {

                if ( xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 ) {

                    var response;

                    switch (option["typeof"]) {

                        case "string" :

                            response = xhr.responseText;

                            break;

                        case "json" :

                            response = JSON.parse(xhr.responseText);

                            break;

                        case "xml" : {

                            console.log("not set xml parser");
                        }

                        case "html" :

                            response = new DOMParser();

                            response = response.parseFromString(xhr.responseText, "text/html");

                            response = response.firstChild;

                            break;

                        case "stream" : {

                            console.log("not set stream parser");
                        }

                        case "socket" : {

                            console.log("not set socket parser");

                        }

                        default :

                            console.log("not know this  parser");
                    }

                    option["success"](response);

                } else {

                    console.error(xhr.status, xhr.responseText)
                }

                break;
            }

            default :

        }

    };

    var url = config.url;

    xhr.responseType = option.responseType || "";

    xhr.open(method, url, async, option.username, option.password);

    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    var data = "";

    switch (code) {

        case "form" : {

            config.data.Foreach(function (key, value, proto) {

                if (proto) {

                    data = data + "&" + key + "=" + value;
                }
            });

            data = data.substring(1);

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            break;
        }

        case "json" : {

            xhr.setRequestHeader("Content-Type", "application/json");

            data = JSON.stringify(config.data);

            break
        }

        default :

            console.log("error catch coded");

    }

    header.Foreach(function (key, value, proto) {

        if (proto) {

            if ( key.toLowerCase() == "cookie" ) {

                var cookie;

                header[key].Foreach(function (key, value, proto) {

                    if (proto) {

                        cookie = cookie + key + "=" + value + ";" ;
                    }

                });

                header[key] = cookie;
            }

            xhr.setRequestHeader(key, value);
        }

    });

    xhr.send(data);

};

Network.JsonP = function (link, option) {

    // option = {
    //     name : "jsonp",
    //     value : "callback",
    //     functor : function (response) {
    //         //......
    //     }
    // };

    var name = option.name;
    var value = option.value;

    link.data[name] = value;

    window[name] = function (reponse) {

        switch (option.type) {

        }

        option["functor"](reponse);

        delete window[name];
    };

    var url = Network.Form.Encoded(link.data, link.url);

    var script = document.createElement("script");

    script.type = "text/javascript";
    script.src = url;

    document.head.appendChild(script);
    document.head.removeChild(script);

};


function Hetui () {

    Hetui.prototype.version = "0.1.24";

    this["@Hetui::observer"] = new Observer();
}

Hetui.Observe = function (object) {

    var hetui = new Hetui();

    var observer = hetui["@Hetui::observer"];

    var watcher = function (context, field) {

        for (var objkey in context) {

            if (Object.prototype.hasOwnProperty.call(context, objkey)) {

                // console.log(objkey, context[objkey]);

                var observe = context[objkey];

                field.push(objkey);

                if (typeof observe == "function" && observe["@Hetui::observer"]) {

                    observe.call(context, object, field, observer);

                    field = field.slice(0, -1);

                } else if (typeof observe == "object") {

                    watcher(observe, field);

                    field = [];

                } else {

                    field.pop();

                    // console.log(objkey, context[objkey])
                }

            }
        }
    };

    watcher (object, []);

    observer = object;

    hetui.Run(observer);

    return observer;
};

Hetui.Directive = function (tuple) {

};

Hetui.prototype.Run = function (observer) {

    var hetui = this,
        watcher = hetui["@Hetui::observer"];

    var htm = new HtmNode(document);

    var zhentu = {              // 阵图
        range : new Array (3),  // 范围界限 0上级 Element 1后级 Node 2前级 Node
        field : [],             // 作用域字段
        subject : [],           // 信号主题 signal
    };

    var NodeDFS = function (htm) {

        switch (htm.Type) {

            case HtmNodeType.TextNode:

                htm.Data = htm.Data.TrimSpace();

                if (htm.Data) {

                    var mode = new RegExp("\\[\\[-[^\\[\\[]*?\\]\\]", "g");

                    var template = htm.Data.match(mode);

                    while (template) {

                        console.log(template);

                        template = null
                    }


                    // console.dir(htm.Node);
                    //
                    // console.log(htm.Data);
                }

                break;

            case HtmNodeType.Element:

                if (Attribute.Exist(htm.Node, "HeTui")) {

                    htm["signal"] = {};

                    htm.Attribute.Foreach(function (attribute) {

                        var signal = htm["signal"];

                        switch (attribute.name) {

                            // Functor or Functor(Param, ) event context node ...

                            case "hetui":

                                if (attribute.value) {

                                    signal[attribute.name] = {
                                        Name: attribute.value,
                                        Param : undefined,
                                        Functor : Hetui,
                                    };

                                    signal = signal[attribute.name];

                                    attribute.value.split(":").forEach(function (value) {

                                        this.Functor = this.Functor[value];

                                    }, signal);

                                    //console.log(htm);

                                    signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    // console.log(signal);

                                    signal.Functor.apply(hetui, argument);
                                }

                                break;

                            case "@upmouse":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["onmouseup"] = function (event) {

                                    var signal = htm["signal"]["@upmouse"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@downmouse":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["onmousedown"] = function (event) {

                                    var signal = htm["signal"]["@downmouse"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@movemouse":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["onmousemove"] = function (event) {

                                    var signal = htm["signal"]["@movemouse"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@entermouse":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["onmouseenter"] = function (event) {

                                    var signal = htm["signal"]["@entermouse"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@touchstart":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["ontouchstart"] = function (event) {

                                    var signal = htm["signal"]["@touchstart"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@touchstart:":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node.addEventListener("touchstart", function (event) {

                                    var signal = htm["signal"]["@touchstart:"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                });

                                // htm.Node["ontouchstart"] = function (event) {
                                //
                                //     var signal = htm["signal"]["@touchstart"];
                                //
                                //     var argument = signal.Param.tuple;
                                //
                                //     signal.Param.Foreach(function (value, index) {
                                //
                                //         switch (value) {
                                //
                                //             case "event":
                                //
                                //                 this[index] = event;
                                //
                                //                 break;
                                //
                                //             case "htm":
                                //
                                //                 this[index] = htm;
                                //
                                //                 break;
                                //
                                //             case "observer":
                                //
                                //                 this[index] = observer;
                                //
                                //             default:
                                //
                                //         }
                                //
                                //     }, argument);
                                //
                                //     return signal.Functor.apply(hetui, argument);
                                //
                                // };

                                break;

                            case "@touchmove":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["ontouchmove"] = function (event) {

                                    var signal = htm["signal"]["@touchmove"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@touchmove:":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node.addEventListener("touchmove", function (event) {

                                    var signal = htm["signal"]["@touchmove:"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                });

                                break;

                            case "@touchend":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["ontouchend"] = function (event) {

                                    var signal = htm["signal"]["@touchend"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@touchenter":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["ontouchenter"] = function (event) {

                                    var signal = htm["signal"]["@touchenter"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@touchleave":

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["ontouchleave"] = function (event) {

                                    var signal = htm["signal"]["@touchleave"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@click": // on bind

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : undefined,
                                    Functor : Hetui,
                                };

                                signal = signal[attribute.name];

                                // console.log(attribute.Value);

                                attribute.value.split(":").forEach(function (value) {

                                    this.Functor = this.Functor[value];

                                }, signal);

                                //console.log(htm);

                                signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                htm.Node["onclick"] = function (event) {

                                    var signal = htm["signal"]["@click"];

                                    var argument = signal.Param.tuple;

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);

                                };

                                break;

                            case "@click:": // bind event listener

                                break;

                            case "@click|functor": // (Arrow) function Param

                                var funcbody = attribute.value.split("=>");

                                if (funcbody.length < 2) {

                                    throw "Framework Hetui @click|functor use '=>' symbol"
                                }

                                var argument = funcbody[0].split(",");

                                // console.log(argument, funcbody);

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple (argument),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                signal.Param.Foreach(function (value, index) {

                                    this[index] = value.TrimSpace();
                                });

                                argument.push(funcbody.slice(1).join("=>"));

                                signal.Functor = Function.apply(this, argument);

                                // console.dir(signal);

                                htm.Node["onclick"] = function (event) {

                                    var signal = htm["signal"]["@click|functor"];

                                    var argument = signal.Param.tuple;

                                    // console.log(signal, argument);

                                    signal.Param.Foreach(function (value, index) {

                                        switch (value) {

                                            case "event":

                                                this[index] = event;

                                                break;

                                            case "htm":

                                                this[index] = htm;

                                                break;

                                            case "observer":

                                                this[index] = observer;

                                            default:

                                        }

                                    }, argument);

                                    return signal.Functor.apply(hetui, argument);
                                };

                                break;

                            case "@submit":

                                if (htm.TagName == "Form") {

                                    signal[attribute.name] = {
                                        Name: attribute.value,
                                        Param : undefined,
                                        Functor : Hetui,
                                    };

                                    signal = signal[attribute.name];

                                    // console.log(attribute.Value);

                                    attribute.value.split(":").forEach(function (value) {

                                        this.Functor = this.Functor[value];

                                    }, signal);

                                    //console.log(htm);

                                    signal.Param = new Tuple (Class.Functor.Param(signal.Functor));

                                    htm.Node["onsubmit"] = function (event) {

                                        var signal = htm["signal"]["@submit"];

                                        var argument = signal.Param.tuple;

                                        signal.Param.Foreach(function (value, index) {

                                            switch (value) {

                                                case "event":

                                                    this[index] = event;

                                                    break;

                                                case "form":

                                                    // 从属于 Form 的 element 携带 name 属性

                                                    var name, form = {};

                                                    for (var n = 0; n < htm.Node.length; n++) {

                                                        name = htm.Node[n].name;

                                                        if (name) {

                                                            form[name] = htm.Node[n].value;
                                                        }
                                                    };

                                                    this[index] = form;

                                                    break;

                                                case "htm":

                                                    this[index] = htm;

                                                    break;

                                                case "observer":

                                                    this[index] = observer;

                                                default:

                                            }

                                        }, argument);

                                        return signal.Functor.apply(hetui, argument);
                                    }

                                } else {

                                    throw "Framework Hetui @submit bind 'Form' element."
                                }

                                break;

                            case "#hide":

                                htm.Node.style.display = "none";

                                Attribute.Remove(htm.Node, "#hide");

                                hetui[attribute.value] = function (boolean) {

                                    if (boolean) {

                                        htm.Node.style.display = "none";

                                    } else {

                                        htm.Node.style.display = "initial";
                                    }
                                };

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : Class.Functor.Param(hetui[attribute.value]),
                                    Functor : hetui[attribute.value],
                                };

                                signal[attribute.name].Param = new Tuple(signal[attribute.name].Param);

                                hetui[attribute.value]["#hide"] = true;

                                break;

                            case ":attr":

                                var field = attribute.value.split("|");

                                var attr = field[0].TrimSpace();

                                if (field.length > 2) {

                                    throw "Framework Hetui :attr namespace more than threshold."
                                }

                                field = field.slice(1).join("|").split(":");

                                var subject = field;

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "attr", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "attr":

                                            this[index] = attr;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, attr, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]]
                                    }

                                    Attribute.Update(htm.Node, attr, value)
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, attr, field);

                                // console.log(signal, subject);
                                //
                                // console.log(htm.Node, htm);

                                break;

                            case ":attr|href":

                                var field = attribute.value.split(":");

                                var subject = field;

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]]
                                    }

                                    htm.Node.href = value;
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                // console.log(htm.Node);
                                //
                                // console.log(htm);

                                break;

                            case ":attr|href|functor":

                                var field = attribute.value.split("|");

                                var subject = field[1].TrimSpace().split(":");

                                field = field[0].TrimSpace().split(":");

                                var functor = Hetui;

                                subject.forEach(function (value, index) {

                                    functor = functor[value];
                                });

                                subject = field;


                                if (zhentu.range[0]) {

                                    field = zhentu.field;

                                    subject = zhentu.subject;

                                    var scope = zhentu.field.slice();

                                };

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple (Class.Functor.Param(functor)),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        case "observer":

                                            this[index] = observer;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (field) {

                                    var value = functor.apply(htm, signal.Param.tuple);

                                    htm.Node.href = value;

                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                break;

                            case ":attr|src":

                                var field = attribute.value.split(":");

                                var subject = field;

                                if (zhentu.range[0]) {

                                    // console.log(htm.Node);

                                    field = zhentu.field.concat(field);

                                    subject = zhentu.subject;

                                    var scope = zhentu.field.slice();

                                }

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        // console.log(htm.Node);

                                        if (!value) return;

                                        switch (field[i]) {

                                            case "#index":

                                                value = scope[0] + 1;

                                                break;

                                            default:

                                                value = value[field[i]]
                                        }
                                    }

                                    // console.log(field);

                                    htm.Node.src = value;
                                };

                                // console.log(subject, signal)

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                // console.log(htm);

                                break;

                            case ":text":

                                var field = attribute.value.split(":");

                                var subject = field;

                                // console.log(htm.Node);


                                if (zhentu.range[0]) {

                                    // console.log(zhentu.field);
                                    //
                                    // console.log(zhentu.field.tuple);
                                    //
                                    // console.log(zhentu.range);
                                    //
                                    // console.log(zhentu.subject);

                                    field = zhentu.field.concat(field);

                                    // console.log(field);

                                    subject = zhentu.subject;

                                    var scope = zhentu.field.slice();

                                }

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    // console.log(field);

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        // console.log(htm.Node);

                                        if (!value) return;

                                        switch (field[i]) {

                                            case "#index":

                                                var index = scope.length;

                                                value = scope[index-1] + 1;

                                                break;

                                            default:

                                                value = value[field[i]]
                                        }
                                    }

                                    htm.Node.innerText = value;
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                break;

                            case ":text|functor":

                                var field = attribute.value.split("|");

                                var subject = field[1].TrimSpace().split(":");

                                field = field[0].TrimSpace().split(":");

                                var functor = Hetui;

                                subject.forEach(function (value, index) {

                                    functor = functor[value];
                                });

                                subject = field;

                                // if (zhentu.range[0]) {
                                //
                                //     field = zhentu.field.concat(field);
                                //
                                //     subject = zhentu.subject;
                                //
                                //     var scope = zhentu.field.slice();
                                //
                                // }

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple (Class.Functor.Param(functor)),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        case "observer":

                                            this[index] = observer;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (field) {

                                    var value = functor.apply(htm, signal.Param.tuple);

                                    htm.Node.innerText = value;
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                break;

                            case ":value":

                                var field = attribute.value.split(":");

                                var subject = field;

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]]
                                    }

                                    htm.Node.value = value;
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                // console.log(htm);
                                //
                                // console.log(htm.Node);

                                break;

                            case ":value|name":

                                htm.Node.name = attribute.value;

                                var field = attribute.value.split(":");

                                var subject = field;

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]]
                                    }

                                    htm.Node.value = value;
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                // console.log(htm);
                                //
                                // console.log(htm.Node);

                                break;

                            case ":style|width":

                                var field = attribute.value.split(":");

                                var subject = field;

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]]
                                    }

                                    htm.Node.style.width = value;
                                };

                                watcher.subscribe(subject, signal);

                                Attribute.Remove(htm.Node, attribute.name);

                                signal.Functor.call(observer, htm, field);

                                break;

                            case "::symbol":

                                switch (attribute.value) {

                                    case "continue":

                                        var index = zhentu.field.length;

                                        // // if (zhentu.field[index-1] == 3) {
                                        // //
                                        //     console.log(zhentu.field, "XXXXXX");
                                        //     console.log(htm.Node)
                                        // // }

                                        zhentu.field[index-1]++;

                                        // console.log(zhentu.field);

                                        break;

                                    default:
                                }

                                break;

                            case "boolean|class":

                                var field = attribute.value.split("?");

                                var boolean = field[1].TrimSpace();

                                field = field[0].TrimSpace();

                                field = field.split(":");

                                var subject = field;

                                boolean = boolean.split("|");

                                boolean = {
                                    "true" : boolean[0].TrimSpace(),
                                    "false" : boolean[1].TrimSpace(),
                                };

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field", "boolean"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        case "boolean":

                                            this[index] = boolean;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field, boolean) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]]
                                    }

                                    if (value) {

                                        Attribute.Update(htm.Node, "class", boolean["true"])

                                    } else {

                                        Attribute.Update(htm.Node, "class", boolean["false"])
                                    }
                                };

                                // console.log(field, signal);

                                watcher.subscribe(subject, signal);

                                signal.Functor.call(observer, htm, field, boolean);

                                break;

                            case "boolean|show":

                                var field = attribute.value.split(":");

                                var subject = field;


                                if (zhentu.range[0]) {

                                    field = zhentu.field.concat(field);

                                    subject = zhentu.subject;

                                    var scope = zhentu.field.slice();

                                }

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        if (!value) return;

                                        value = value[field[i]]
                                    }

                                    if (!value) {

                                        htm.Node.style.display = "none";
                                    }
                                };

                                // console.log(field, signal);

                                watcher.subscribe(subject, signal);

                                signal.Functor.call(observer, htm, field);

                                break;

                            case "foreach:":

                                // console.log(zhentu.field, zhentu.subject);

                                var range = new Array (3);

                                var subject = attribute.value.split(":");

                                var field = subject.slice();


                                range[0] = htm.Node.parentElement;

                                range[1] = htm.Node.nextSibling;

                                range[2] = htm.Node.previousSibling;


                                if (zhentu.range[0]) {

                                    field = zhentu.field.concat(subject);

                                    subject = zhentu.subject.slice();

                                } else {


                                }


                                // console.log(zhentu);

                                // field = field.slice();
                                //
                                // subject = subject.slice();


                                Attribute.Update(htm.Node, "::symbol", "continue");

                                var child = htm.Node.cloneNode(true);

                                var reference = htm.Node.nextSibling;

                                Attribute.Remove(child, attribute.name);

                                signal[attribute.name] = {
                                    Name: attribute.value,
                                    Param : new Tuple(["htm", "field"]),
                                    Functor : undefined,
                                };

                                signal = signal[attribute.name];

                                var argument = signal.Param.tuple;

                                signal.Param.Foreach(function (value, index) {

                                    switch (value) {

                                        case "htm":

                                            this[index] = htm;

                                            break;

                                        case "field":

                                            this[index] = field;

                                            break;

                                        default:

                                    }

                                }, argument);

                                signal.Functor = function (htm, field) {

                                    var value = this;

                                    for (var i = 0; i < field.length; i++) {

                                        value = value[field[i]];

                                        if (!value) break;
                                    }

                                    range.tuple = zhentu.range;

                                    subject.tuple = zhentu.subject;

                                    zhentu.subject = subject;

                                    zhentu.range = range;

                                    var store = field.concat(0);

                                    store.tuple = zhentu.field;

                                    zhentu.field = store;

                                    var size = htm.container.length;

                                    if (value && value.length) {

                                        if (size> value.length) {

                                            for (i = value.length; i < size; ) {

                                                size = size - 1;

                                                var node = htm.container[size];

                                                zhentu.range[0].removeChild(node);

                                                htm.container.pop();
                                            }

                                        } else {

                                            for (i = size; i < value.length; i++) {

                                                // console.log(i, htm.container);

                                                var node = htm.Node;

                                                var parent = node.parentElement;

                                                node = child.cloneNode(true);

                                                // Attribute.Update(node, "index", i);

                                                Attribute.Remove(node, attribute.name);

                                                parent.insertBefore(node, reference);

                                                htm.container.push(node);

                                                NodeDFS(new HtmNode(node));

                                            }

                                            var index = zhentu.field.length - 1;

                                            zhentu.field[index] = 0;

                                        }

                                    } else {


                                    }

                                };

                                // console.log(htm.Node);
                                //
                                // console.log(subject);
                                //
                                // console.log(field);

                                watcher.subscribe(subject, signal);

                                htm.container = new Array (htm.Node);

                                signal.Functor.call(observer, htm, field);

                                break;

                            default:

                            // console.log(attribute.Value)

                        }

                    }, htm);

                }

                break;

            default:

        }

        // console.log(htm);

        var tuple = HtmNode.Children(htm.Node);

        tuple.HtmNode();

        for (var i = 0; i < tuple.length; i++) {

            if (tuple[i].Node == zhentu.range[1]) {

                zhentu.field = zhentu.field.tuple;

                zhentu.subject = zhentu.subject.tuple;

                zhentu.range = zhentu.range.tuple;
            }

            if (tuple[i].Type == 2) {

                NodeDFS(tuple[i]);
            }
        }

    };

    NodeDFS (htm);

};




