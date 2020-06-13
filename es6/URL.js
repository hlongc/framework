let url = new URL('http://hcl:pwd@180.101.49.11:8081/user/info?a=1&b=2&b=4&b=5&pass=false#center')
const entries = url.searchParams.entries()

for (const [key, value] of entries) {
  console.log(key, value)
}

console.log(url.searchParams.getAll('b'))
console.log(url.searchParams.get('pass'))