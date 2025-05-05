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
   * 3. Se houver dois ou mais produtos com o mesmo número de matches, retorne o último produto.
   * 4. Se o tipo de recomendação não for selecionado, retorne todos os produtos.
   */

  const { selectedPreferences, selectedFeatures, selectedRecommendationType } = formData;

  const selectedReduce = (product) => {
    return selectedPreferences.reduce((counter, preference) => {
      return product.preferences.includes(preference) ? counter + 1 : counter;
    }, 0) + selectedFeatures.reduce((counter, feature) => {
      return product.features.includes(feature) ? counter + 1 : counter;
    }, 0);
  };
  
  const toGetListProducts = products.map(selectedReduce);
  const toGetMaxProducts = Math.max(...toGetListProducts);
  
  const recommendedProducts = (() => {
    if (selectedRecommendationType === 'SingleProduct') {
      const collectedProducts = products.filter((product) => selectedReduce(product) === toGetMaxProducts);
  
      // Se tiver mais que um produto com o mesmo número de matches, retorna o último
      return collectedProducts.length > 1 ? [collectedProducts.at(-1)] : collectedProducts;
    } else {
      return products.filter((product) =>
        selectedPreferences.some((preference) => product.preferences.includes(preference)) ||
        selectedFeatures.some((feature) => product.features.includes(feature))
      );
    }
  });
  
  return recommendedProducts;
  
};

export default { getRecommendations };
