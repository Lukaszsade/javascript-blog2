'use strict';

{

    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        articleTagLinks: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
        articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloudLink').innerHTML),
        authorListLink: Handlebars.compile(document.querySelector('#template-authorListLink').innerHTML)
    }

    const optArticleSelector = '.post';
    const optTitleSelector = '.post-title';
    const optTitleListSelector = '.titles';
    const optArticleTagsSelector = '.post-tags .list';
    const optArticleAuthorSelector = '.post-author';
    const optTagsListSelector = '.tags .list';
    const optCloudClassCount = '5';
    const optCloudClassPrefix = 'tag-size-';
    const optAuthorsListSelector = '.list .authors';


    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [IN PROGRESS] add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');


        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);


        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }

    function generateTitleLinks(customSelector = '') {

        /* remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* for each article */
        let html = '';
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        ///let html = '';

        for (let article of articles) {


            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* get the title from the title element */

            /* create HTML of the link */
            //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            const linkHTMLData = { id: articleId, title: articleTitle };
            const linkHTML = templates.articleLink(linkHTMLData);

            /* insert link into titleList */
            titleList.insertAdjacentHTML('beforeend', linkHTML);

            html = html + linkHTML;


        }
        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');


        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    function calculateTagsParams(tags) {
        const params = {
            min: 999999,
            max: 0,
        }

        for (let tag in tags) {

            if (tags[tag] > params.max) {
                params.max = tags[tag];
            }
            if (tags[tag] < params.min) {
                params.min = tags[tag];
            }
        }
        return params;
    }

    calculateTagsParams();

    function calculateTagClass(count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
        return optCloudClassPrefix + classNumber;
    }

    function generateTags() {


        /* [NEW] create a new variable allTags with an empty object */
        let allTags = {};

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles) {


            /* find tags wrapper */
            const tagsWrapper = article.querySelector(optArticleTagsSelector);
            ///titleList.innerHTML = '';

            /* make html variable with empty string */
            let html = '';

            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');


            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');


            /* START LOOP: for each tag */

            for (let tag of articleTagsArray) {
                /* generate HTML of the link */
                ///const taglinkHTML = '<a href="#tag-' + tag + '">' + tag + '</a> ';
                const linkHTMLData = { tag };
                const taglinkHTML = templates.articleTagLinks(linkHTMLData);

                /* add generated code to HTML variable */
                html = html + taglinkHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (!allTags[tag]) {
                    /* [NEW] add tag to allTags object */
                    allTags[tag] = 1;
                } else {
                    allTags[tag]++;
                }

                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;


            /* END LOOP: for every article: */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');

        /* [NEW] add html from allTags to tagList */
        //tagList.innerHTML = allTags.join(' ');

        const tagsParams = calculateTagsParams(allTags);

        /* [NEW] create variable for all links HTML code */
        ///let allTagsHTML = ' ';
        const allTagsData = { tags: [] };

        /* [NEW] START LOOP: for each tag in allTags: */
        for (let tag in allTags) {

            /* [NEW] generate code of a link and add it to allTagsHTML */
            const tagLinkHTML = '<a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a> ';

            //allTagsHTML += tagLinkHTML;
            allTagsData.tags.push({
                tag: tag,
                count: allTags[tag],
                class: calculateTagClass(allTags[tag], tagsParams)
            });
        }
        /* [NEW] END LOOP: for each tag in allTags: */

        /*[NEW] add HTML from allTagsHTML to tagList */
        //tagList.innerHTML = allTagsHTML;
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
    }



    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */
        const activeTags = document.querySelectorAll('a.active[href^="#tag-"]')


        /* START LOOP: for each active tag link */
        for (let activeTag of activeTags) {

            /* remove class active */
            activeTag.classList.remove('active');

            /* END LOOP: for each active tag link */
        }

        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

        /* START LOOP: for each found tag link */
        for (let tagLink of tagLinks) {

            /* add class active */
            tagLink.classList.add('active');

            /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }

    function addClickListenersToTags() {
        /* find all links to tags */
        const tagLinks = document.querySelectorAll('.post-tags a, .list.tags a');

        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {

            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        }
        /* END LOOP: for each link */
    }

    generateTags();

    addClickListenersToTags();

    function generateAuthors() {

        let allAuthors = {};

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles) {

            /* find authors wrapper */
            const authorsWrapper = article.querySelector(optArticleAuthorSelector);

            /* make html variable with empty string */
            let html = '';

            /* get authors from data-author attribute */
            const articleAuthor = article.getAttribute('data-author');


            /* insert HTML of all the links into the authors wrapper */
            ///const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
            const linkHTMLData = { articleAuthor };
            const linkHTML = templates.articleAuthorLink(linkHTMLData);
            html = html + linkHTML;

            if (!allAuthors[articleAuthor]) {
                allAuthors[articleAuthor] = 1;

            } else {
                allAuthors[articleAuthor]++;
            }

            authorsWrapper.innerHTML = html;
        }

        const authorList = document.querySelector('.authors');

        //let allAuthorsHTML = '';

        const allAuthorsData = { authors: [] }

        for (let articleAuthor in allAuthors) {
            //const authorLinkHTML = '<a href="#author-' + articleAuthor + '"><span class="author-name">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</span></a> ';
            // allAuthorsHTML += authorLinkHTML;
            allAuthorsData.authors.push({
                articleAuthor: articleAuthor,
                count: allAuthors[articleAuthor],
            })
        }
        //authorList.innerHTML = allAuthorsHTML;
        authorList.innerHTML = templates.authorListLink(allAuthorsData);
    }
    generateAuthors()

    function addClickListenersToAuthors() {
        const authorLinks = document.querySelectorAll('a[href^="#author-"]');

        for (let author of authorLinks) {

            author.addEventListener('click', authorClickHandler);
        }

    }

    addClickListenersToAuthors();
    function authorClickHandler(event) {

        event.preventDefault();
        const clickedElement = this;

        const href = clickedElement.getAttribute('href');


        const author = href.replace('#author-', '');


        const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');


        if (activeAuthorLinks) {

            for (let activeAuthor of activeAuthorLinks) {

                activeAuthor.classList.remove('active');
            }
        }

        const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

        for (let author of authorLinks) {

            author.classList.add('active');
        }
        generateTitleLinks('[data-author="' + author + '"]');

    }

}