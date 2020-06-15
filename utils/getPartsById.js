export default function getPartsById(ids, parts) {
  const allParts = Object.values(parts).flat();
  return ids.map((id) => {
    if (Array.isArray(id)) {
      return id.map((eitherId) =>
        allParts.find((part) => part.id === eitherId)
      );
    } else {
      return allParts.find((part) => part.id === id);
    }
  });
}
