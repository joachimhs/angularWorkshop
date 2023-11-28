import time
import getopt
from flask import jsonify
from flask import json
from flask import Flask
from flask import request
from flask import url_for
from flask import Response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

delay = 2

app.config['CORS_HEADERS'] = 'Content-Type'


class Album(dict):
    def __init__(self, id, image, caption, images):
        dict.__init__(self, id=id, image=image, caption=caption, images=images)


class Albums(dict):
    def __init__(self, albums):
        dict.__init__(self, albums=albums)


class Photo(dict):
    def __init__(self, id, title):
        dict.__init__(self, id=id, title=title)


class Photos(dict):
    def __init__(self, photos):
        dict.__init__(self, photos=photos)


albums = [];
albums.append(Album('makro', 'IMGP4117.jpg', 'makro',
                    ['IMGP4117.jpg', 'background1.jpg', 'IMGP4642.jpg', 'IMGP6801.jpg', 'IMGP3329.jpg']))
albums.append(Album('norge2020', 'background1.jpg', 'Norge 2020', ['IMGP4117.jpg', 'background1.jpg']))

photos = []
photos.append(Photo('IMGP4117.jpg', 'Valmue'));
photos.append(Photo('background1.jpg', 'Tyttebær'));
photos.append(Photo('IMGP4642.jpg', 'Tyttebær 2'));
photos.append(Photo('IMGP6801.jpg', 'Sommerfugl'));
photos.append(Photo('IMGP3329.jpg', 'Hvitveis'));


def get_albumsData():
    return albums


def getPhotosData():
    return photos


@app.route('/api/albums')
@cross_origin()
def get_albums():
    print('GET ALBUMS')
    if (delay > 0):
        time.sleep(2)
    return Response(json.dumps({"albums": get_albumsData()}), mimetype='application/json')


@app.route('/api/albums/<id>', methods=['GET'])
@cross_origin()
def get_album(id):
    print("GET ALBUM: " + id)
    if (delay > 0):
        time.sleep(2)
    for index, album in enumerate(get_albumsData()):
        if (album.get('id') == id):
            return Response(json.dumps({"album": album}), mimetype='application/json')

    return 'not found!', 404


@app.route('/api/albums/<id>', methods=['PUT'])
@cross_origin()
def put_album_api(id):
    if (delay > 0):
        time.sleep(2)
    print("PUT")
    print(request.data);
    messageBody = json.loads(request.data)['album'];
    print(messageBody);

    for index, album in enumerate(get_albumsData()):
        if (album.get('id') == id):
            album['id'] = messageBody['id'];
            return json.dumps({"album": album});

    return 'not found!', 404


@app.route('/api/albums/<id>', methods=['DELETE'])
@cross_origin()
def delete_album_api(id):
    if (delay > 0):
        time.sleep(2)
    print("DELETE")

    foundIndex = -1

    for index, album in enumerate(get_albumsData()):
        if (album.get('id') == id):
            foundIndex = index

    if foundIndex >= 0:
        del get_albumsData()[foundIndex]
        return "OK", 200

    return 'not found!', 404


@app.route('/api/photos')
@cross_origin()
def get_photos():
    print('GET PHOTOS')
    if (delay > 0):
        time.sleep(2)
    return Response(json.dumps({"photos": getPhotosData()}), mimetype='application/json')


@app.route('/api/photos/<id>', methods=['GET'])
@cross_origin()
def get_photo(id):
    print("GET ALBUM: " + id)
    if (delay > 0):
        time.sleep(2)
    for index, photo in enumerate(getPhotosData()):
        if (photo.get('id') == id):
            return Response(json.dumps({"photo": photo}), mimetype='application/json')

    return 'not found!', 404


@app.route('/api/photos/<id>', methods=['PUT'])
@cross_origin()
def put_photo_api(id):
    if (delay > 0):
        time.sleep(2)
    print("PUT");
    print(request.data);
    messageBody = json.loads(request.data)['photo'];
    print(messageBody);

    for index, photo in enumerate(getPhotosData()):
        if (photo.get('id') == id):
            photo['id'] = messageBody['id'];
            return json.dumps({"photo": photo});

    return 'not found!', 404


@app.route('/api/photos/<id>', methods=['DELETE'])
@cross_origin()
def delete_photo_api(id):
    if (delay > 0):
        time.sleep(2)
    print("DELETE")

    foundIndex = -1

    for index, photo in enumerate(getPhotosData()):
        if (photo.get('id') == id):
            foundIndex = index

    if foundIndex >= 0:
        del getPhotosData()[foundIndex]
        return "OK", 200

    return 'not found!', 404
