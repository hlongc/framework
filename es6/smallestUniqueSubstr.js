

/**
 * @param {string} str
 * @return {string}
 */
 function smallestUniqueSubstr(str) {
  // your code here
  const unique = [...new Set(str)].sort()
  const map = {}
  for (let i = 0; i < str.length; i++) {
    const char = str[i]
    if (map[char]) {
      map[char].push(i)
    } else {
      map[char] = [i]
    }
  }
  console.log(unique)
  console.log(map)
}

smallestUniqueSubstr('xyzabcxyzabc')