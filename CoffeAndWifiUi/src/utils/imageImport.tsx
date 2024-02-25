
export interface Images extends Array<string> {}

export const importImages = async (numberOfImages: number) => {
  const images: Images = [];
  for (let i = 1; i <= numberOfImages; i++) {
    const imageName = `cafe${i}`;
    const imagePath = `../assets/images/${imageName}.jpg`;
    try {
      const image = await import(imagePath);
      images.push(image.default);
    } catch (error) {
      console.error(`Error importing ${imageName}:`, error);
    }
  }
  return images;
};
