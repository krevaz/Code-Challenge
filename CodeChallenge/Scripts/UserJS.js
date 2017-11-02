var user = {
    // Decide to use jQuery selector. 
    contentHolder: $('.contentHolder'), nameContainer: $('.nameContainer'), imgHolder: $('.imgHolder'), jobResultHolder: $('.jobResultHolder'),
    socContainer: $('.socContainer'), jobListHolder: $('.jobListHolder'),
    // Create real image of user or if not exist apply empty image by gender.
    createImage: function (imagePath) {
        user.imgHolder.html('');
        user.imgHolder.append('<img src="' + imagePath + '" alt="User Image" width="100%"><div class="imgCount">' +
            utility.PicList.length + ' Images found</div>');
    },

    // For this time using only user full name and applying under user image.
    createPersonalInfo: function (contInfo) {
        user.nameContainer.append('<div class=""><label class="control-label fullName">' +
            contInfo.fullName ? contInfo.fullName : 'No name' + '</label></div>');
    },

    // This will render map of user address if any.
    createDemographicInfo: function (demogInfo) {
        var htmlString = '', address = '';
        if (demogInfo.city && demogInfo.state) {
            address = demogInfo.city.name + '+' + demogInfo.state.name;

            htmlString = '<div class="panel panel-default"><div class="panel-heading"><h4>Location</h4></div> <div class="panel-body">' +
                '<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA4jrhfv19qj0UJazSSa9Nz-EL5cb_qfXY &amp;q=' +
                address + '" frameborder="0" allowfullscreen="" style="border:0"></iframe ></div ></div > ';

            user.contentHolder.append(htmlString);
        }
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
            user.jobListHolder.append(user.htmlHelper(title, val));

        });
        // Line after each job record.
        user.jobListHolder.append('<div class="col-md-12"><hr></div>');
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
                    user.socContainer.append('<a href="' + val + '" target="_blank" class="socMarginR" ><span class="' + icon + '"></span></a>');
                    break;
            }
        });
    },

    htmlHelper: function (name, value) {
        return '<div class="col-md-12">' + name + ' ' + value + '</div>';
    }
}