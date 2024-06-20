import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { IsLoggedGurad } from "./guards/is-logged.guard";
import { PipelineComponent } from "./pipeline/pipeline.component";

const routes: Routes = [
    {
        path: "home",
        component: MainComponent,
        canActivate: [IsLoggedGurad],
        children:[
            {
                path: "pipeline",
                component: PipelineComponent,
                canActivate: [IsLoggedGurad]
            },
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "**",
        redirectTo: "home"
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }