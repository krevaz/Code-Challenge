var utility = {
    PicList: [],
    // using javascript to get the data
    newpostReq: function (url, callBack, data) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else if (window.XDomainRequest) { // In case to support CORS in IE 8 and 9
            xmlhttp = new XDomainRequest();
            xmlhttp.onload = function () { callBack(xmlhttp.responseText) };
        }
        else {
            return;
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callBack(xmlhttp.responseText);
            }
            else if (xmlhttp.status == 404) {
                user.jobResultHolder.html('');
                user.contentHolder.html('User not Found!').css('color', 'red');
                user.createImage('Img/Male.jpg');
                return false;
            }
            else if (xmlhttp.status == 403) {
                user.jobResultHolder.html('');
                user.contentHolder.html('Invalid key or key not locked!').css('color', 'red');
                return false;
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    },
    // Get data using jQuery ajax call
    ajaxCall: function (url, success, data, async) {
        var type = 'GET';
        if (async === undefined) {
            async = false;
        }
        if (data) {
            type = 'POST';
        }
        $.ajax({
            type: type,
            url: url,
            contentType: 'application/json',
            async: async,
            data: JSON.stringify(data),
            success: success,
            error: function (error) {
                if (error.status == 404) {
                    user.jobResultHolder.html('');
                    user.contentHolder.html('User not Found!').css('color', 'red');
                    user.createImage('Img/Male.jpg');
                    return false;
                }
                else if (error.status == 403) {
                    user.jobResultHolder.html('');
                    user.contentHolder.html('Invalid key or key not locked!').css('color', 'red');
                    return false;
                }
                else {
                    user.resultHolder.css('color', '');
                }
            }
        });
    },
    // Validate email address
    ValidateEmail: function (element) {
        var MyEmail = element.value;
        var format = /^(?:[a-zA-Z0-9._\-+]+|(?:".+"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)+$/;
        MyEmail = MyEmail.trim();
        if (!MyEmail.match(format)) {
            element.style.border = '2px solid  red';
            return false;
        }
        element.style.border = '2px solid #ccc';
        return true;
    },

    // Validate empty fields
    requiredFieldValidate: function (element) {
        var text = element.value.trim();
        if (text == '') {
            element.style.border = '2px solid  red';
            return false;
        }
        element.style.border = '2px solid #ccc';
        return true;
    },

    getListItem: function (obj, func) {
        if (obj) {
            if (obj.length > 0) {
                for (var i = 0; i < obj.length; i++) {
                    func(obj[i]);
                }
            }
            else if (typeof obj.length == 'undefined') {
                func(obj);
            }
        }
    },

    createPicList: function (picObj) {
        utility.PicList.push(picObj.url);
    },    
}