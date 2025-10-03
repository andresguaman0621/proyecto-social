# 🚀 Guía de Despliegue en Railway

Este documento describe cómo desplegar la aplicación "Corazones en Acción" en Railway.

## 📋 Requisitos Previos

- Cuenta en [Railway](https://railway.app)
- Repositorio de GitHub con el código del proyecto
- El proyecto ya está configurado y listo para deployment

## 🔧 Configuración del Proyecto

El proyecto ya incluye:

### 1. **railway.json** - Configuración de Railway
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npx serve -s build -l $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### 2. **package.json** - Scripts configurados
- `npm run dev` - Desarrollo local (React dev server en puerto 3000)
- `npm run build` - Compilar para producción
- `npm start` - Servir build en producción (usado por Railway)

### 3. **serve** - Servidor de archivos estáticos
Instalado como dependencia para servir la aplicación React compilada.

## 🚂 Pasos para Desplegar en Railway

### Opción 1: Deployment desde GitHub (Recomendado)

1. **Conectar GitHub a Railway**
   - Ve a [railway.app](https://railway.app)
   - Inicia sesión con tu cuenta
   - Click en "Start a New Project"

2. **Seleccionar repositorio**
   - Click en "Deploy from GitHub repo"
   - Autoriza Railway para acceder a tus repositorios
   - Selecciona el repositorio `proyecto-social`

3. **Configuración automática**
   - Railway detectará automáticamente que es un proyecto Node.js
   - Usará la configuración de `railway.json`
   - Ejecutará:
     ```bash
     npm install
     npm run build
     npm start
     ```

4. **Variables de entorno** (si son necesarias)
   - En el dashboard de Railway, ve a "Variables"
   - Agrega cualquier variable necesaria (actualmente no hay ninguna requerida)

5. **Deployment**
   - Railway desplegará automáticamente el proyecto
   - Te dará una URL pública (ej: `tu-proyecto.up.railway.app`)

### Opción 2: Deployment desde CLI

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login a Railway
railway login

# Inicializar proyecto
railway init

# Desplegar
railway up
```

## 🔄 Auto-Deployment

Una vez conectado a GitHub:
- Cada push a la rama `master` desplegará automáticamente
- Puedes ver los logs en tiempo real en el dashboard de Railway
- Los deployments fallidos se revierten automáticamente

## 📊 Monitoreo

En el dashboard de Railway puedes:
- Ver logs en tiempo real
- Monitorear uso de recursos
- Configurar dominios personalizados
- Ver métricas de deployment

## 🌐 Desarrollo Local

Para desarrollo local (después del deployment):

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# La app estará en http://localhost:3000
```

## 🔒 Configuración de Dominio Personalizado (Opcional)

1. En Railway, ve a "Settings" > "Domains"
2. Click en "Add Custom Domain"
3. Ingresa tu dominio personalizado
4. Configura los DNS según las instrucciones de Railway

## ⚙️ Variables de Entorno (para futuras implementaciones)

Si en el futuro necesitas variables de entorno:

```bash
# En Railway Dashboard > Variables
PORT=3000  # Railway lo configura automáticamente
NODE_ENV=production
```

## 🐛 Solución de Problemas

### Build falla
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Railway
- Asegúrate de que `npm run build` funcione localmente

### La aplicación no inicia
- Verifica que el script `start` esté configurado correctamente
- Railway necesita el puerto de la variable `$PORT`
- Revisa los logs de deployment

### Cambios no se reflejan
- Verifica que hayas hecho push a la rama correcta
- Railway solo despliega cambios commiteados
- Revisa el historial de deployments

## 📝 Notas Importantes

1. **Puerto**: Railway asigna automáticamente un puerto a través de la variable `$PORT`
2. **Build**: El build se ejecuta automáticamente en cada deployment
3. **Cache**: Railway cachea `node_modules` para builds más rápidos
4. **Logs**: Accesibles en tiempo real desde el dashboard

## 🎯 Checklist Pre-Deployment

- [x] `railway.json` configurado
- [x] Scripts de `package.json` actualizados
- [x] `serve` instalado como dependencia
- [x] Build probado localmente
- [x] Código commiteado en GitHub
- [ ] Conectar repositorio a Railway
- [ ] Verificar deployment exitoso
- [ ] Probar URL de producción

## 🔗 Enlaces Útiles

- [Documentación de Railway](https://docs.railway.app)
- [Railway Dashboard](https://railway.app/dashboard)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Troubleshooting](https://docs.railway.app/troubleshoot/fixing-common-errors)

---

¡Tu aplicación está lista para ser desplegada! 🎉
