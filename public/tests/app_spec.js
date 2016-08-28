describe('LearnJS', function() {
    it('can show a problem view', function() {
        learnjs.showView('#problem-1');
        expect($('.view-container .problem-view').length).toEqual(1);
    });

    it('shows the landing page view when there is no hash', function() {
        learnjs.showView('');
        expect($('.view-container .landing-view').length).toEqual(1);
    });

    it('passes the hash view parameter to the view function', function() {
        spyOn(learnjs, 'problemView');
        learnjs.showView('#problem-42');
        expect(learnjs.problemView).toHaveBeenCalledWith('42');
    });

    it('should invoke the router when loaded', function() {
        spyOn(learnjs, 'showView');
        learnjs.appOnReady();
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    it('should subscribe to the hash change event', function() {
        learnjs.appOnReady();
        spyOn(learnjs, 'showView');
        $(window).trigger('hashchange');
        expect(learnjs.showView).toHaveBeenCalledWith(window.location.hash);
    });

    describe('problem view', function() {
        var view;

        beforeEach(function() {
            view = learnjs.problemView('1');
        });

        it('has a title that includes the problem number', function() {
            expect(view.find('.title').text()).toEqual('Problem #1');
      });

        describe('answer section', function() {
            it('should check for correct answer when button is clicked', function() {
                view.find('.answer').val('true');
                view.find('.check-btn').click();

                expect(view.find('.correct-flash span').text()).toEqual('Correct!');
                expect(view.find('.correct-flash a').attr('href')).toEqual('#problem-2');
            });

            it('should reject an incorrect answer', function() {
                view.find('.answer').val('false');
                view.find('.check-btn').click();

                expect(view.find('.result').text()).toEqual('Incorrect!');
            });
        });
    });

});
