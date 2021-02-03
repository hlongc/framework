export const flattenTree = data => {
  let key = 0;
  const flat = (data, parent) => {
    return data.reduce((memo, node) => {
      node.key = key;
      memo[key] = {
        node,
        parent
      };
      key++;
      if (node.children) {
        memo = { ...memo, ...flat(node.children, node) };
      }
      return memo;
    }, {});
  };
  return flat(data);
};
