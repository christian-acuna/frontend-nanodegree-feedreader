/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        describe("Each RSS Feed", function () {
          /* This test  loops through each feed
           * in the allFeeds object and ensures it has a URL defined
           * and that the URL is not empty.
           */
           it('has a URL defined and is not empty', function () {
             allFeeds.forEach(function(feed) {
               expect(feed.url).toBeDefined();
               expect(feed.url.length).not.toEqual(0);
             });
           });

          /* This test loops through each feed
           * in the allFeeds object and ensures it has a name defined
           * and that the name is not empty.
           */
          it('has a name and is not empty', function () {
            allFeeds.forEach(function(feed) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toEqual(0);
            });
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function () {
      var body, slideMenu, menuIcon;

      beforeEach(function () {
        body = $('body');
        slideMenu = $('.menu-hidden .slide-menu');
      });
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it("is hidden by default", function () {
        expect(body).toHaveClass('menu-hidden');
        expect(slideMenu.length).toEqual(1);
      });
       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
       it("when clicked on changes visibility", function () {
         var menuIcon = $('.menu-icon-link');
         menuIcon.click();
         expect(body).not.toHaveClass('menu-hidden');
         menuIcon.click();
         expect(body).toHaveClass('menu-hidden');
       });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
      var entriesLength, feed;
      beforeEach(function (done) {
        feed = $('.feed');
        loadFeed(0, function() {
          entriesLength = $('.entry').length;
          done();
        });

      });
      /*  This test ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      it("have a .feed container and at least 1 .entry element", function (done) {
        expect(feed.length).toEqual(1);
        expect(entriesLength).not.toEqual(0);
        done();
      });
    });

    describe("New Feed Selection", function () {
        var feedHTML;
        /*  This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function (done) {
             loadFeed(1, function() {
               feedHTML = $('.feed').html();
               done();
             });

         });

       it("actually changes content", function (done) {
         loadFeed(0, function() {
           expect($('.feed').html()).not.toEqual(feedHTML);
           done();
         });
       });
    });

}());
