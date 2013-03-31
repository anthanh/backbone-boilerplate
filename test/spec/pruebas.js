var pickleStore = {
  count: 0,
  status: '',
  pickles: function() {
    var self = this;
    $.ajax({
      url: 'http://localhost:3000/pickles',
      dataType: 'json',
      success: function(data) {
        self.count = parseInt(data.count, 10);
        self.status = data.status;
      }
    });
  },
  add: function(num) {
    $.ajax({
      url: 'http://localhost:3000/pickles/add/' + num,
      dataType: 'json',
      success: function(data) {
        console.log(data);
      }
    });
  }
};

describe('Pickle Store', function() {
  describe('#pickles', function() {

    // Use Sinon to replace jQuery's ajax method
    // with a spy.
    beforeEach(function() {
      sinon.stub($, 'ajax').yieldsTo('success', {
        count: '100',
        message: 'oh boy, 100 pickles!'
      });
    });

    // Restor jQuery's ajax method to its
    // original state
    afterEach(function() {
      $.ajax.restore();
    });

    it('should make an ajax call', function(done) {
      pickleStore.pickles();
      expect($.ajax.calledOnce).to.be.equal(true);
      done(); // let Mocha know we're done async testing
    });
    
    it('should update the count', function(done) {
      pickleStore.pickles();
      expect(pickleStore.count).to.equal(100);
      done();
    });
    
  });
});