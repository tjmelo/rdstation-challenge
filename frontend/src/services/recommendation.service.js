// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  /**
   * Crie aqui a lógica para retornar os produtos recomendados.
   * -----------------------------------------------------------
   * LÓGICA DOS PRODUTOS RECOMENDADOS
   * -----------------------------------------------------------
   * 1. Se o tipo de recomendação for "SingleProduct", retorne apenas um produto que tenha o maior número de matches.
   * 2. Se o tipo de recomendação for "MultipleProducts", retorne todos os produtos que tenham pelo menos um match.
   * 3. Se o tipo de recomendação não for selecionado, retorne todos os produtos.
   */

  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const selectedReduce = (product) => {
    return selectedPreferences.reduce((counter, preference) => {
      return product.preferences.includes(preference) ? counter + 1 : counter;
    }, 0) + selectedFeatures.reduce((counter, feature) => {
      return product.features.includes(feature) ? counter + 1 : counter;
    }, 0);
  }

  const recommendedProducts = products.filter((product) => {

    if (selectedRecommendationType === 'SingleProduct') {
      const matchCounter = selectedReduce(product);

      return matchCounter > 0 && matchCounter === Math.max(...products.map(product => {
        return selectedReduce(product);
      }));
    } else {
      return selectedPreferences.some((preference) =>
        product.preferences.includes(preference))
      || selectedFeatures.some((feature) =>
        product.features.includes(feature)
      );
    }
  });

  return recommendedProducts
};

export default { getRecommendations };
