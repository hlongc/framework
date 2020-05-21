let prevHistory = null

function pushHistory(tabName, path,state) {
  if (!prevHistory) {
    prevHistory = {
      path,
      tabName,
      state,
      alternate: null
    }
  } else {
    const alternate = prevHistory
    alternate.alternate = null
    prevHistory = {
      path,
      tabName,
      state,
      alternate
    }
  }
}

function getHistory() {
  return prevHistory
}

function clearHistory() {
  prevHistory = null
}

pushHistory('tab1', '/a', { date: '2017-09-08', count: 1 })
pushHistory('tab2', '/a/b', { date: '2017-09-09', count: 2 })
pushHistory('tab3', '/b/c', { date: '2017-09-10', count: 3 })
pushHistory('tab4', '/c/d', { date: '2017-09-11', count: 4 })
pushHistory('tab3', '/d/e', { date: '2017-09-10', count: 3 })

console.log(getHistory())