$(document).ready(function () {
    var key = '', chkLock = $('#chkLock'), txtKey = document.getElementById('txtKey'), count = 0;
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

        user.jobResultHolder.html('');
        user.contentHolder.html('');
        user.nameContainer.html('');
        user.imgHolder.html('');
        user.contentHolder.css('color','')
        utility.PicList = [];

        var returndata = function (data) {
            if (data) {
                var personInfo;
                if (typeof data === 'object') { // $.json returns object
                    personInfo = data;
                }
                else {
                    personInfo = JSON.parse(data); // xmlhttp returns json string. converting to object.
                }
                //Creates array of Images
                utility.getListItem(personInfo.photos, utility.createPicList);
                // Creates image
                user.createImage(utility.PicList[0]);
                //Get user personal info and renders on the page
                utility.getListItem(personInfo.contactInfo, user.createPersonalInfo);
                //Get user Social sites and renders icons to navigate to its page
                utility.getListItem(personInfo.socialProfiles, user.createSocialInfo);
                //Get User living locations and renders as a map iframe on the page
                if (personInfo.demographics && personInfo.demographics.locationDeduced) {
                    user.createDemographicInfo(personInfo.demographics.locationDeduced);
                }
                //Get user work history and renders on the page
                utility.getListItem(personInfo.organizations, user.createJobList);
            }
        }

        // 2 way getting data. replace comments key: 2e50796db7e235e0

        // 1. way to get data using javascript. This call will work even for IE 8 & 9
        utility.newpostReq('https://api.fullcontact.com/v2/person.json?apiKey=' + key + '&email=' + txtEmail.value + '', returndata);

        // 2. way to get data using jQuery ajax call
        //utility.ajaxCall('https://api.fullcontact.com/v2/person.json?apiKey=' + key + '&email=' + txtEmail.value + '', returndata);

    });

    user.imgHolder.click(function changeImage() {
        count++;
        if (count == utility.PicList.length) {
            count = 0;
        }
        user.createImage(utility.PicList[count]);
    });
});
