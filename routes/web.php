<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContactInformationController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobNamesController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NumberController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PropertyBuyRequestController;
use App\Http\Controllers\PropertySaleRequestController;
use App\Http\Controllers\RealStateController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/admin', function () {
    return Inertia::render('admin/Dashboard');
})->name('dashboard');

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::get('/realestate', function () {
    return Inertia::render('RealState');
});

Route::get('/all-projects', function () {
    return Inertia::render('Projects');
});
Route::get('/all-projects/{id}', function () {
    return Inertia::render('ProjectShow');
});

Route::get('/contact-us', function () {
    return Inertia::render('ContactUs');
});
Route::get('/favorites', function () {
    return Inertia::render('Favorites');
});
Route::get('/about-us', function () {
    return Inertia::render('AbouteUs');
});
Route::get('/schools-for-sale', function () {
    return Inertia::render('SchoolsForSale');
});
Route::get('/hospitals-for-sale', function () {
    return Inertia::render('HospitalsForSale');
});
Route::get('/realestate/{id}', function () {
    return Inertia::render('Show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('admin/Dashboard');
    });
    Route::get('/admin/real-estate', function () {
        return Inertia::render('admin/RealEstate');
    });
    Route::get('/admin/job-applications', function () {
        return Inertia::render('admin/JobApplications');
    });
    Route::get('/admin/buy-requests', function () {
        return Inertia::render('admin/BuyRequests');
    });
    Route::get('/admin/sell-requests', function () {
        return Inertia::render('admin/SellRequests');
    });
    Route::get('/admin/projects', function () {
        return Inertia::render('admin/Projects');
    });
    Route::get('/admin/setting', function () {
        return Inertia::render('admin/Setting');
    });
    Route::get('/admin/contact', function () {
        return Inertia::render('admin/ContactRequests');
    });
    Route::get('/admin/management', function () {
        return Inertia::render('admin/ContactInformation');
    });

});

Route::prefix('real-estate')->controller(RealStateController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/top', 'top');
    Route::get('/{id}', 'show');
    Route::post('/', 'store');
    Route::post('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('categories')->controller(CategoryController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('locations')->controller(LocationController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('types')->controller(TypeController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('buy-requests')->controller(PropertyBuyRequestController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('sell-requests')->controller(PropertySaleRequestController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('job-applications')->controller(JobApplicationController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('jop-name')->controller(JobNamesController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('contact')->controller(ContactController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('users')->controller(UserController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('projects')->controller(ProjectController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/top', 'top');
    Route::get('/{id}', 'show');
    Route::post('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('contact-information')->controller(ContactInformationController::class)->group(
    function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{id}', 'update');
        Route::delete('/{id}', 'destroy');
    }
);

Route::prefix('numbers')->controller(NumberController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});

Route::prefix('outlets')->controller(OutletController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');
});



// if (app()->environment('local') && request()->getHost() !== 'localhost') {
//     URL::forceScheme('https');
// }
require __DIR__ . '/console.php';
require __DIR__ . '/auth.php';
