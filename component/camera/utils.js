export function findOptimalPictureSize(sizes, maxWidth = 1600) {
  const widthAndIndex = sizes.map((size, index) => {
    const widthHeight = size.split("x");
    return { width: widthHeight[0], index };
  });
  const bestPictureSize = widthAndIndex.filter(
    ({ width }) => Number(width) <= maxWidth
  );
  const indexPosition = bestPictureSize.length - 1;
  return sizes[indexPosition];
}
