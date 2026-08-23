/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as WorkRouteImport } from './routes/work'
import { Route as StudioRouteImport } from './routes/studio'
import { Route as ContactRouteImport } from './routes/contact'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

const WorkRoute = WorkRouteImport.update({
  id: '/work',
  path: '/work',
  getParentRoute: () => rootRouteImport,
} as any)

const StudioRoute = StudioRouteImport.update({
  id: '/studio',
  path: '/studio',
  getParentRoute: () => rootRouteImport,
} as any)

const ContactRoute = ContactRouteImport.update({
  id: '/contact',
  path: '/contact',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/work': typeof WorkRoute
  '/studio': typeof StudioRoute
  '/contact': typeof ContactRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/work': typeof WorkRoute
  '/studio': typeof StudioRoute
  '/contact': typeof ContactRoute
}

export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/work': typeof WorkRoute
  '/studio': typeof StudioRoute
  '/contact': typeof ContactRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/work' | '/studio' | '/contact'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/work' | '/studio' | '/contact'
  id: '__root__' | '/' | '/work' | '/studio' | '/contact'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  WorkRoute: typeof WorkRoute
  StudioRoute: typeof StudioRoute
  ContactRoute: typeof ContactRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/work': {
      id: '/work'
      path: '/work'
      fullPath: '/work'
      preLoaderRoute: typeof WorkRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/studio': {
      id: '/studio'
      path: '/studio'
      fullPath: '/studio'
      preLoaderRoute: typeof StudioRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/contact': {
      id: '/contact'
      path: '/contact'
      fullPath: '/contact'
      preLoaderRoute: typeof ContactRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  WorkRoute: WorkRoute,
  StudioRoute: StudioRoute,
  ContactRoute: ContactRoute,
}

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
