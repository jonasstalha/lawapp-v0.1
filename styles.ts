const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  searchSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
  },
  filterButton: {
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
  },
  selectedCategoryText: {
    color: 'white',
  },
  // ... Add all other styles from both components

  // Blog post specific styles
  heroImage: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 24,
  },
  articleContainer: {
    padding: 16,
  },
  // ... Add remaining styles
}); 