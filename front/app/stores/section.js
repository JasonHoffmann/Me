var Section = Backbone.Model.extend({
	defaults : {
		activated : 'false',
		name : '',
		slug: ''
	}
});

var SectionCollection = Backbone.Collection.extend({
	model: Section,
	url: 'http://slash-me.dev/wp-json/me/v1/modules',
	active: function(section) {
		var filtered = this.where({activated : true});
		return new SectionCollection(filtered);
	}
});

var sectionStore = new SectionCollection({});

export default sectionStore;