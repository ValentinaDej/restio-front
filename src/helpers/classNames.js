export function classNames(cls, mods = {}, additional = []) {
  return [
    cls,
    ...Object.keys(mods)?.filter((classname) => mods[classname]),
    ...additional?.filter(Boolean),
  ].join(' ');
}
