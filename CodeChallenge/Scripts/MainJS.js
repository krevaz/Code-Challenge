$(document).ready(function () {
    var key = '', chkLock = $('#chkLock'), txtKey = document.getElementById('txtKey');
    $('.chkLock').click(function () {
        if (utility.requiredFieldValidate(txtKey)) {
            if (chkLock.is(':checked')) {
                txtKey.value = key;
                key = '';
                txtKey.style.display = '';
            }
            else {
                key = txtKey.value;
                txtKey.style.display = 'none';
            }
        }
    });

    $('#btnSubmit').click(function () {
        if (!utility.requiredFieldValidate(txtKey)) {
            return;
        }
        var txtEmail = document.getElementById('txtEmail');
        if (!utility.ValidateEmail(txtEmail)) {
            return;
        }

        var returndata = function (data) {
            if (data) {
                var personInfo;
                if (typeof data === 'object') { //$.json returns object
                    personInfo = data;
                }
                else {
                    personInfo = JSON.parse(data); // xmlhttp returns json string. converting to object.
                }
                user.jobResultHolder.html('');
                user.resultHolder.html('');

                if (personInfo.photos) {
                    user.createImage(personInfo.photos[0].url);
                }
                else {
                    if (personInfo.demographics && personInfo.demographics.gender) {
                        user.createImage('/Img/' + personInfo.demographics.gender + '.jpg');
                    }
                    else {
                        user.createImage('/Img/Male.jpg');
                    }
                }

                utility.getListItem(personInfo.contactInfo, user.createPersonalInfo );
               
                utility.getListItem(personInfo.socialProfiles, user.createSocialInfo);
               
                if (personInfo.demographics && personInfo.demographics.locationDeduced) {
                    user.createDemographicInfo(personInfo.demographics.locationDeduced);
                }

                utility.getListItem(personInfo.organizations, user.createJobList);
            }
        }
        
        // 2 way getting data. replace comments key: 2e50796db7e235e0

        // 1. way to get data using javascript. This call will work even for IE 8 & 9
        utility.newpostReq('https://api.fullcontact.com/v2/person.json?apiKey=' + key + '&email=' + txtEmail.value + '', returndata);

        // 2. way to get data using jQuery ajax call
        //utility.ajaxCall('https://api.fullcontact.com/v2/person.json?apiKey=' + key + '&email=' + txtEmail.value + '', returndata);

    });
});
