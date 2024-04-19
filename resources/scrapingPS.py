from pyscrapper.assembly.managers import StandardScrapeManager
from pyscrapper.assembly.observers import CallbackObserver
from pyscrapper.assembly.urlloaders import PhantomUrlLoader

CONFIG = {
    "title": ".header > h1",
    "desc": ".header > h2",
    "avatar": {
        "selector": ".header > img",
        "attr": "src"
    }
}
# URL of the webpage to be scrapped
URL = "https://ionicabizau.net"


def callback(url, data, **kwargs):
    """ Prints url, data, unique id which is generate while scrape request is created."""
    print('Unique Id in callback ', kwargs['id'])
    print("Result ",url, data)


if __name__ == '__main__':
    manager = StandardScrapeManager(PhantomUrlLoader(max_workers=10))
    manager.add_observer(CallbackObserver([callback]))
    id = manager.scrape(URL, CONFIG)
    print('Unique id ', id)