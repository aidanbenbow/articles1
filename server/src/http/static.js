import express from 'express';
import path from 'path';
import fs from 'fs';

export function setupStatic(app) {
  const clientPath = path.join(process.cwd(), 'client');
  const srcPath = path.join(clientPath, 'src');
  app.use(express.static(clientPath));
  app.use(express.static(srcPath));

    
    app.use((req, res, next) => {
      if(req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(srcPath, 'index.html'));
    });

}