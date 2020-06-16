import getMissingDependencies from "./getMissingDependencies";

export default function missingDependenciesToString(
  dependencies,
  activeParts,
  allParts
) {
  const missingDependencies = getMissingDependencies(
    dependencies,
    activeParts,
    allParts
  );
  const missingPartsString = missingDependencies
    .map((part) => {
      if (Array.isArray(part)) {
        return part
          .map((eitherPart) => {
            return `"${eitherPart.name}"`;
          })
          .join(" or ");
      }
      return `"${part.name}"`;
    })
    .join(" and ");
  return `Requires ${missingPartsString}`;
}
