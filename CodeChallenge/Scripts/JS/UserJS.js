var user = {
    // Decide to use jQuery selector. 
    resultHolder: $('.resultHolder'), jobResultHolder: $('.jobResultHolder'),

    // Create real image of user or if not exist apply empty image by gender.
    createImage: function (imagePath) {
        user.resultHolder.html('');
        user.resultHolder.append('<div class="mainContainer">' +
            '<img src="' + imagePath + '" alt="User Image" width="100%"><div class="nameContainer"></div ></div > ');
    },
    // For this time using only user full name and applying under user image.
    createPersonalInfo: function (contInfo) {
        $('.nameContainer').append('<div class="col-md-12"><label class="control-label fullName">' + contInfo + '</label></div>');
    },
    // Create list of user jobs list, if provided.
    createJobList: function (organizations) {
        var title = '';
        $.each(organizations, function (key, val) {
            switch (key) {
                //--This data is bad. Setting to empty. --
                case 'isPrimary':                  
                case 'current': 
                    title = '';
                    val = '';
                    break;
                //----End----------
                case 'startDate': 
                    title = 'Start date:';
                    break;
                case 'endDate':
                    title = 'End date:';
                    break;
                case 'name':
                    title = 'Company:';
                    break;
                case 'title':
                    title = 'Title:';
                    break;
                default:
                    title = '';
                    break;
            }
            // Write job records
            user.jobResultHolder.append('<div class="col-md-12">' + title + ' ' + val + '</div>'); 
           
        });
        // Line after each job record.
        user.jobResultHolder.append('<hr><br />'); 
    },
    // Create social media network icons list under picture frame.
    createSocialInfo: function (socialInfo) {
        var icon = '';
        $.each(socialInfo, function (key, val) {
            switch (key) {
                case 'typeId':
                    icon = 'fa fa-' + val + ' fa-2x';
                    break;
                case 'url':
                    user.resultHolder.append('<a href="' + val + '" target="_blank" class="socMarginR" ><span class="' + icon + '"></span></a>');
                    break;
            }
        });
    },
}