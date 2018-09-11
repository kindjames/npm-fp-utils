import * as fs from 'fs'
import fetch from 'node-fetch'
import { always, concat, cond, curryN, either, invoker, isEmpty, join, map, pipe, T, tap, toPairs, unless, when } from 'ramda'
import { isNull, isObjectLike, isUndefined, thenP } from 'ramda-adjunct'
import { promisify } from 'util'

export const report = (label: string) =>
  tap(pipe(
    cond([
      [either(isNull, isUndefined), always('')],
      [isObjectLike, pipe(toJson, concat(' \n'))],
      [T, x => ' ' + x]
    ]),
    when(isObjectLike, toJson),
    concat(label),
    console.log
  ))

export const writeFile = curryN(2, promisify(fs.writeFile))

export const readFile = curryN(1, promisify(fs.readFile))

export const toJson = (x: any) =>
  JSON.stringify(x, null, 2)

export const fromJson = JSON.parse

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const downloadText = pipe(
  report('> downloading'),
  fetch,
  thenP(invoker(0, 'text'))
)

export const downloadJson = pipe(
  report('> downloading'),
  fetch,
  thenP(invoker(0, 'json'))
)

export const buildUrl = (baseUrl: string, params: object = {}) =>
  pipe(
    toPairs,
    map(join('=')),
    join('&'),
    unless(isEmpty, concat('?')),
    concat(baseUrl)
  )(params)
