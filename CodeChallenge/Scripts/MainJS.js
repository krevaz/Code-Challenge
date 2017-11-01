$(document).ready(function () {
    var key = '', chkLock = $('#chkLock'), txtKey = document.getElementById('txtKey');
    $('.chkLock').click(function () {
        if (utility.requiredFieldValidate(txtKey)) {
            if (chkLock.is(':checked')) {
                chkLock.text();
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
                var personInfo = '';
                if (typeof data === 'object') {
                    personInfo = data;
                }
                else {
                    personInfo = JSON.parse(data);
                }
                user.jobResultHolder.html('');
                user.resultHolder.html('');

                if (personInfo.photos) {
                    user.createImage(personInfo.photos[0].url);
                }
                else {
                    var gender = personInfo.demographics.gender;
                    user.createImage('/Img/' + gender + '.jpg');
                }

                if (personInfo.contactInfo) {
                    user.createPersonalInfo(personInfo.contactInfo.fullName);
                }
                else {
                    user.createPersonalInfo('No Name.');
                }

                if (personInfo.socialProfiles) {
                    if (personInfo.socialProfiles.length > 0) {
                        for (var i = 0; i < personInfo.socialProfiles.length; i++) {
                            user.createSocialInfo(personInfo.socialProfiles[i]);
                        }
                    }
                }
				
				if (personInfo.demographics && personInfo.demographics.locationDeduced) {
                    user.createDemographicInfo(personInfo.demographics.locationDeduced);
                }
				
                if (personInfo.organizations) {
                    if (personInfo.organizations.length > 0) {
                        for (var i = 0; i < personInfo.organizations.length; i++) {
                            user.createJobList(personInfo.organizations[i]);
                        }
                    }
                }
            }
        }
        // 2 way getting data. replace comments key: 2e50796db7e235e0

        // 1. way to get data using javascript. This call will work even for IE 8 & 9
        utility.newpostReq('https://api.fullcontact.com/v2/person.json?apiKey=' + key + '&email=' + txtEmail.value + '', returndata);

        // 2. way to get data using jQuery ajax call
        //utility.ajaxCall('https://api.fullcontact.com/v2/person.json?apiKey=' + key + '&email=' + txtEmail.value + '', returndata);


    });
});
