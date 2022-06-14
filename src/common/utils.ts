const formatHeight = (height: string) => {
  const re = /\b(\d+)(\d{2})\b/;
  const subst = "$1.$2";

  const cHeight = height.padStart(3, "0");
  return isNaN(+cHeight) ? cHeight : cHeight.replace(re, subst) + " m";;
};

const formatWeight = (weight: string) => {
  return isNaN(+weight) ? weight : `${weight} kg`;
};

export { formatHeight, formatWeight };
