<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompressResponse
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Hanya kompres jika response adalah HTML
        if (method_exists($response, 'getContent') && str_contains($response->headers->get('Content-Type') ?? '', 'text/html')) {
            $content = $response->getContent();
            
            $search = [
                '/\>[^\S ]+/s'    => '>',     // hapus spasi setelah tag
                '/[^\S ]+\</s'    => '<',     // hapus spasi sebelum tag
                '/(\s)+/s'         => '\\1',  // gabungkan spasi ganda
                '/<!--(.|\s)*?-->/' => ''      // hapus komentar HTML
            ];
            
            $content = preg_replace(array_keys($search), array_values($search), $content);
            $response->setContent($content);
        }

        return $response;
    }
}
