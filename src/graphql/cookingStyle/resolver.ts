const cookingStyleResolver = {
  Query: {
    cookingStyles() {
      return [
        { id: 1, label: 'Italian' },
        { id: 2, label: 'Chinese' },
        { id: 3, label: 'Mexican' },
      ];
    },
  },
};

export default cookingStyleResolver;
