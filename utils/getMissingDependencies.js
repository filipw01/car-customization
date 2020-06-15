export default function getMissingDependencies(dependencies, activeParts) {
  const activePartsValues = Object.values(activeParts);
  const MissingDependencies = [];
  if (dependencies) {
    for (const dependency of dependencies) {
      let dependencySatisfied = false;
      if (Array.isArray(dependency)) {
        for (const either of dependency) {
          if (activePartsValues.includes(either)) {
            dependencySatisfied = true;
            break;
          } else {
            dependencySatisfied = false;
          }
        }

        if (dependencySatisfied === false) {
          MissingDependencies.push(dependency);
        }
      } else {
        if (!activePartsValues.includes(dependency)) {
          MissingDependencies.push(dependency);
        }
      }
    }
  }
  return MissingDependencies;
}
