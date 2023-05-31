/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"e2ZkanGyppz9vp4i","label":"media","bookmarks":[{"id":"IHt9BfH7Vkm4niEK","label":"youtube","url":"https://www.youtube.com"},{"id":"upFb5eFjVmGUgSZu","label":"netflix","url":"https://www.netflix.com"},{"id":"lQf1khqOUKHkpAy2","label":"plex","url":"https://plex.tv"}]},{"id":"DZxANfXheLQcMJ6g","label":"game-wikis","bookmarks":[{"id":"0wqYbiNi9R9u4FlY","label":"zs arsenal mechanics","url":"https://cdn.discordapp.com/attachments/445010344423718912/1112850690851733574/zs_weapon_mechanics.png"},{"id":"dBjz7XQ89uFPaXyo","label":"calamity class guide","url":"https://calamitymod.wiki.gg/wiki/Guide:Class_setups"},{"id":"0sKA5sfEX6ad3RFP","label":"thorium class guide","url":"https://thoriummod.wiki.gg/wiki/Guide:Class_setups"}]},{"id":"kPtojKw4w51bWFO9","label":"boredom-corner","bookmarks":[{"id":"PkmFC98Gj1mELSWi","label":"galaxy.click [clicker games]","url":"https://galaxy.click"},{"id":"3Oq1vrK37auIZMSk","label":"plaza.dsolver [clicker games]","url":"https://plaza.dsolver.ca"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
