/* globals define, describe, it, expect, $, sinon, beforeEach, afterEach */
define([
    'scripts/app'
], function(
    app
) {
    'use strict';
    var dummy = function() {
        return $.ajax({
            type: 'GET',
            url: 'https://api.github.com/legacy/repos/search/javascript'
        });
    };

    var sandbox = sinon.sandbox.create();

    describe('sinon spy example', function() {
        beforeEach(function() {
            sandbox.restore();
        });

        var profileForm = {
            section: 0,

            setSection: function (section) {
                return true;
            },

            next: function() {
                this.section = this.section + 1;
                this.setSection(this.section);
            }
        };

        it('sinon spy', function() {
            var spyProfileForm = sandbox.spy(profileForm, 'setSection');
            // spyProfileForm.withArgs(1);

            profileForm.next();
            expect(spyProfileForm.withArgs(1).calledOnce).to.be.equal(true);
            expect(profileForm.section).to.be.equal(1);

            profileForm.next();
            expect(spyProfileForm.withArgs(2).calledOnce).to.be.equal(true);
            expect(profileForm.section).to.be.equal(2);

        });

        var view1 = (function() {
            var section = 0;
            var View1 = Backbone.Marionette.ItemView.extend({
                functionThatTriggerEvent: function() {
                    section = section + 1;
                    app.vent.trigger('functionThatTriggerEvent', section);
                }
            });
            return new View1();
        })();

        var view2 = (function() {
            var View2 = Backbone.Marionette.ItemView.extend({
                section: 0,
                initialize: function() {
                    var that = this;
                    app.vent.on('functionThatTriggerEvent', function (section) {
                        that.functionThatReceivesEvent(section);
                    });
                },
                functionThatReceivesEvent: function(section) {
                    this.section = section;
                    return true;
                }
            });
            return new View2();
        })();

        var view3 = (function() {
            var View3 = Backbone.Marionette.ItemView.extend({
                section: 0,
                initialize: function() {
                    var that = this;
                    app.vent.on('functionThatTriggerEvent', function (section) {
                        that.functionThatReceivesEvent(section);
                    });
                },
                functionThatReceivesEvent: function(section) {
                    this.section = section;
                    return true;
                }
            });
            return new View3();
        })();

        it('sinon spy with events first time', function() {
            // var spyView1 = sandbox.spy(view1, 'functionThatTriggerEvent');
            var spyView2 = sandbox.spy(view2, 'functionThatReceivesEvent');
            // spyProfileForm.withArgs(1);

            view1.functionThatTriggerEvent();
            expect(spyView2.calledOnce).to.be.equal(true);
            expect(spyView2.withArgs(1).calledOnce).to.be.equal(true);
            expect(view2.section).to.be.equal(1);
        });

        it('sinon spy with events second time', function() {
            var spyView2 = sandbox.spy(view2, 'functionThatReceivesEvent');
            var spyView3 = sandbox.spy(view3, 'functionThatReceivesEvent');
            // spyProfileForm.withArgs(1);

            view1.functionThatTriggerEvent();
            expect(spyView2.calledOnce).to.be.equal(true);
            expect(spyView2.withArgs(2).calledOnce).to.be.equal(true);
            expect(view2.section).to.be.equal(2);

            expect(spyView3.calledOnce).to.be.equal(true);
            expect(spyView3.withArgs(2).calledOnce).to.be.equal(true);
            expect(view3.section).to.be.equal(2);
            expect(view3.section).to.be.equal(2);
        });

        it('sinon spy with events third time', function() {
            var spyView2 = sandbox.spy(view2, 'functionThatReceivesEvent');
            var spyView3 = sandbox.spy(view3, 'functionThatReceivesEvent');
            // spyProfileForm.withArgs(1);

            view1.functionThatTriggerEvent();
            expect(spyView2.calledOnce).to.be.equal(true);
            expect(spyView2.withArgs(3).calledOnce).to.be.equal(true);
            expect(view3.section).to.be.equal(3);

            expect(spyView3.calledOnce).to.be.equal(true);
            expect(spyView3.withArgs(3).calledOnce).to.be.equal(true);
            expect(view3.section).to.be.equal(3);
            expect(view3.section).to.be.equal(3);
        });

    });

    describe.skip('async test', function() {
        it('async example', function(done) {
            this.timeout(5000);
            dummy().done(function(data) {
                expect(data).to.be.an('object');
                expect(data.repositories).to.be.an('array');
                expect(data.repositories.length).to.be.equal(100);
                done();
            });
        });
    });

    describe('app', function() {
        it('has trigger method', function() {
            expect(app.trigger).to.be.a('function');
        });
    });

    describe('one tautology', function() {
        it('is a tautology', function() {
            expect(true).to.be.equal(true);
        });

        describe('is awesome', function() {
            it('is awesome', function() {
                expect(1).to.equal(1);
            });
        });
    });

    describe('simple tests', function() {
        it('increments', function() {
            var mike = 0;

            expect(mike++ === 0).to.be.equal(true);
            expect(mike === 1).to.be.equal(true);
        });

        it('increments (improved)', function() {
            var mike = 0;

            expect(mike++).to.equal(0);
            expect(mike).to.equal(1);
        });
    });

    describe('setUp/tearDown', function() {
        beforeEach(function() {
            // console.log('Before');
        });

        afterEach(function() {
            // console.log('After');
        });

        it('example', function() {
            // console.log('During');
        });

        describe('setUp/tearDown', function() {
            beforeEach(function() {
                // console.log('Before2');
            });

            afterEach(function() {
                // console.log('After2');
            });

            it('example', function() {
                // console.log('During Nested');
            });
        });
    });

    describe('async', function() {
        it('multiple async', function(done) {
            var semaphore = 2;

            setTimeout(function() {
                expect(true).to.be.true;
                semaphore--;
            }, 500);

            setTimeout(function() {
                expect(true).to.be.true;
                semaphore--;
            }, 500);

            setTimeout(function() {
                expect(semaphore).to.equal(0);
                done();
            }, 600);
        });
    });
});