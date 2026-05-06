import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const token = localStorage.getItem('meuToken');
  console.log('Interceptor rodando!', {
    token,
    method: req.method,
    url: req.urlWithParams,
  });

  if (!token) {
    console.log('authInterceptor: nenhum token encontrado em localStorage para esta requisição.');
  }

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  console.log('authInterceptor request headers:', authReq.headers.keys());

  return next(authReq).pipe(
    catchError((error) => {
      if (error?.status === 401) {
        localStorage.removeItem('meuToken');
        localStorage.removeItem('usuarioLogado');
      }
      return throwError(() => error);
    }),
  );
};
