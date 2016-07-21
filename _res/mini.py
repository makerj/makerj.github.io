import asyncio
import functools
import os

import requests
import re


def save_minified(fut, path):
    with open(replace_regex.sub(r'\1.min.\2', path), 'w') as f:
        f.write(fut.result().text)


def request_minify(path):
    type = 'js' if path.endswith('js') else 'css'
    if type == 'js':
        url = 'https://javascript-minifier.com/raw'
    else:
        url = 'https://cssminifier.com/raw'

    with open(path) as f:
        fut = eventloop.run_in_executor(None, functools.partial(requests.post, url=url, data={'input': f.read()}))
        fut.add_done_callback(functools.partial(save_minified, path=path))
        futures.append(fut)


if __name__ == '__main__':
    root = os.path.dirname(os.path.abspath(__file__))
    find_regex = re.compile(r'.*(?<!min)\.(js|css)', re.I)
    replace_regex = re.compile(r'(.*)\.(js|css)', re.I)

    eventloop = asyncio.get_event_loop()
    futures = []

    for folder, other_folder, files in os.walk(root):
        for file in filter(lambda name: find_regex.match(name), files):
            request_minify(os.path.join(folder, file))
    eventloop.run_until_complete(asyncio.wait(futures))
