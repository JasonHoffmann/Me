import { moduleForModel, test } from 'ember-qunit';

moduleForModel('me-tag', 'Unit | Model | me tag', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
