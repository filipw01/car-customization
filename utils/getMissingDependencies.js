export default function getMissingDependencies(
  dependencies,
  activeParts,
  allParts
) {
  const activePartsIds = activeParts.map((part) => part.id);
  const missingDependencies = [];
  if (dependencies && activeParts.length !== 0) {
    for (const dependency of dependencies) {
      let dependencySatisfied = false;
      if (Array.isArray(dependency)) {
        for (const either of dependency) {
          if (activePartsIds.includes(either)) {
            dependencySatisfied = true;
            break;
          } else {
            dependencySatisfied = false;
          }
        }

        if (dependencySatisfied === false) {
          missingDependencies.push(
            allParts.filter((part) => dependency.includes(part.id))
          );
        }
      } else {
        if (!activePartsIds.includes(dependency)) {
          missingDependencies.push(
            allParts.find((part) => {
              return part.id === dependency;
            })
          );
        }
      }
    }
  }
  return missingDependencies;
}
