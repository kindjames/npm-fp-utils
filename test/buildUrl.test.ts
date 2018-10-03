import test from 'ava'
import { buildUrl, report } from '../src/'

test('when building a url with no params', (t: any) => {
  const url = buildUrl('http://www.google.com')

  t.is(url, 'http://www.google.com')
})

test('when building a url with two params', (t: any) => {
  const url = buildUrl('http://www.google.com', {
    lat: 2.1334,
    long: 1.22
  })

  t.is(url, 'http://www.google.com?lat=2.1334&long=1.22')
})

test('', t => {
  report('hello')({ hello: 'world' })
  t.pass()
})
