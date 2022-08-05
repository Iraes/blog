function cuttingDescription(description: string, slice: number, split: number) {
  if (description.split(" ").length > 30) {
    return description.slice(0, slice);
  }

  if (description.length > 50) {
    return description.split(" ").slice(0, split).join(" ") + " ...";
  }
  return description;
}

export { cuttingDescription };
