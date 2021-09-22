'use strict';
{
    const optArticleSelector = '.post';
    const optTitleSelector = '.post-title';
    const optTitleListSelector = '.titles';
    const optArticleTagsSelector = '.post-tags .list';
    const optArticleAuthorSelector = '.post-author';
    const optTagsListSelector = '.tags.list';

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
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


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

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = [];

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
                const taglinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ';



                /* add generated code to HTML variable */
                html = html + taglinkHTML;

                /* [NEW] check if this link is NOT already in allTags */
                if (allTags.indexOf(linkHTML) == -1) {

                    /* [NEW] add generated code to allTags array */
                    allTags.push(linkHTML);
                }

                /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            tagsWrapper.innerHTML = html;


            /* END LOOP: for every article: */
        }
        /* [NEW] find list of tags in right column */
        const tagList = document.querySelector('.tags');
        console.log(tagList)
        /* [NEW] add html from allTags to tagList */
        tagList.innerHTML = allTags.join(' ');


    }
    generateTags();

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
        const tagLinks = document.querySelectorAll('.post-tags a');

        /* START LOOP: for each link */
        for (let tagLink of tagLinks) {

            /* add tagClickHandler as event listener for that link */
            tagLink.addEventListener('click', tagClickHandler);
        }
        /* END LOOP: for each link */
    }

    addClickListenersToTags();

    function generateAuthors() {

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);

        /* START LOOP: for every article: */
        for (let article of articles) {

            /* find authors wrapper */
            const authorsWrapper = article.querySelector(optArticleAuthorSelector);

            /* make html variable with empty string */
            let html = '';

            /* get authors from data-tags attribute */
            const articleAuthor = article.getAttribute('data-author');


            /* insert HTML of all the links into the authors wrapper */
            const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

            html = html + linkHTML;

            authorsWrapper.innerHTML = html;
        }

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


        const activeAuthorLinks = document.querySelectorAll('a.active[href^="#article-"]');


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