# Spring-boot-app-sample
This is a sample spring-boot web application that is integrated with WSO2 Identity Server for secure authentication
. This readme file descripes on how you can configure your spring-boot app and how you can customize it.

## Register Application


1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Service Providers >Add**. 

3. Enter "sample-app" as the **Service Provider Name**.
 
4. Click **Register**.
    
5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure.**   

7. Select the relevant grant types that you wish to try out from the **Allowed Grant Types** list. 
        
8.  Enter `regexp=(http://localhost:8080/login|http://localhost:8080/login/oauth2/code/wso2)
` as the **Callback Url**.
    
    !!! tip
        For more information on `Callback Url` field and other advanced configurations
        refer, [Advanced OpenID Connect Configurations](../../guides/authentication/oauth-app-config-advanced)
        

| Field                 | Value         | 
| --------------------- | ------------- | 
| Service Provider Name | sample-app  |
| Description           | This is a web application  | 
| Call Back Url         | regexp=(http://localhost:8080/login &#124; http://localhost:8080/login/oauth2/code/wso2)

## Configure OIDC discovery endpoint

1. Change Identity Provider Entity ID as discovery endpoint

2. This spring-boot app makes use of OIDC Discovery supported by WSO2 Identity Server.  
3. As mentioned in this [document](https://github.com/wso2/docs-is/edit/5.9.0/en/docs/learn/openid-connect-discovery.md), 
we need to change the Identity Provider Entity ID as https://localhost:9443/oauth2
/oidcdiscovery. 



## Add the configurations in application.properties file

1. Add the configurations in the application.properties file in your spring-boot-project.

    - Add the client-id, client- secret and the discovery endpoint of WSO2 Identity server.
    - If you have hosted Identity Server in a different host and port, change the **localhost:9443** to **{HOSTNAME
    }:{PORT}**

```properties
spring.security.oauth2.client.registration.wso2.client-name=WSO2 Identity Server
spring.security.oauth2.client.registration.wso2.client-id={client_id}
spring.security.oauth2.client.registration.wso2.client-secret={client-secret}
spring.security.oauth2.client.registration.wso2.redirect-uri={baseUrl}/login/oauth2/code/wso2
spring.security.oauth2.client.registration.wso2.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.wso2.scope=openid
spring.security.oauth2.client.provider.wso2.issuer-uri=https://localhost:9443/oauth2/oidcdiscovery
```
    
  - Once you add these properties in application.properties file, your oauth app is secured. 
  - User can access the app only if the user is authenticated.
  
  
## Login

### Use the Default “/login” endpoint
- Spring Boot generates a default login page for us. All the endpoint of the application is secured except this /login
 page. 
- If you try to access any page of your application, it will redirect to WSO2 Identity Server login page since all the
 pages are secured. 

- If you go to `````“/login”````` endpoint, you can get the default login page of the spring-boot-security.

### Remove the default “/login” page and redirect directly to IS login page.
1. Create a ConfigSecurity class and Extend the WebSecurityConfigurerAdapter.

```java
@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

   protected void configure(HttpSecurity http) throws Exception {

       http.authorizeRequests()
               .antMatchers("/login")
               .permitAll()
               .anyRequest()
               .authenticated()
               .and()
               .oauth2Login().loginPage("/login");
   }
}

```

2.Add redirection to ```"/oauth2/authorization/wso2"``` in your Controller and that would skip the login page.
```java

@GetMapping("/login")
public String getLoginPage(Model model) {

   return "redirect:/oauth2/authorization/wso2";
}

```

### Customizing the login page and uses another login endpoint

- Even Though SpringBoot generates a default login page for us, we'll usually want to define our own customized page.

1. Add a ConfigSecurity class by extending WebSecurityConfigurerAdapter

```java
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

   protected void configure(HttpSecurity http) throws Exception {

       http.authorizeRequests()
               .antMatchers("/oauth-login")
               .permitAll()
               .anyRequest()
               .authenticated()
               .and()
               .oauth2Login().loginPage("/oauth-login");
   }
}
```

2. Have a Login Controller Class and render your Login page when the browser is redirected to /oauth-login 

```java

@Controller
public class LoginController {

   private static String authorizationRequestBaseUri
           = "oauth2/authorization";
   Map<String, String> oauth2AuthenticationUrls
           = new HashMap<>();

   @Autowired
   private ClientRegistrationRepository clientRegistrationRepository;

   @GetMapping("/oauth-login")
   public String getLoginPage(Model model) {

        Iterable<ClientRegistration> clientRegistrations = null;
       ResolvableType type = ResolvableType.forInstance(clientRegistrationRepository)
               .as(Iterable.class);
       if (type != ResolvableType.NONE &&
               ClientRegistration.class.isAssignableFrom(type.resolveGenerics()[0])) {
           clientRegistrations = (Iterable<ClientRegistration>) clientRegistrationRepository;
       }

       clientRegistrations.forEach(registration ->
               oauth2AuthenticationUrls.put(registration.getClientName(),
                       authorizationRequestBaseUri + "/" + registration.getRegistrationId()));
       model.addAttribute("urls", oauth2AuthenticationUrls);

       return "oauth-login";
   }
}
```
#### Have a oauth-login.html page inside resources/templates folder
```html

<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.w3.org/1999/xhtml">
<head>
   <meta charset="UTF-8">
   <title>Title</title>
</head>
<body>
<h3>Login with:</h3>
<p th:each="url : ${urls}">
   <a th:text="${url.key}" th:href="${url.value}">Client</a>
</p>
</body>
</html>
```


## Logout

### Use the Default /logout endpoint

1. Have a ConfigSecurity class by extending WebSecurityConfigurerAdapter
```java

@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

   protected void configure(HttpSecurity http) throws Exception {

       http.authorizeRequests()
               .antMatchers("/oauth-login")
               .permitAll()
               .anyRequest()
               .authenticated()
               .and().oauth2Login().loginPage("/oauth-login")
               .and().logout().logoutSuccessHandler(oidcLogoutSuccessHandler());

   }

   @Autowired
   private ClientRegistrationRepository clientRegistrationRepository;

   private LogoutSuccessHandler oidcLogoutSuccessHandler() {
       OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
               new OidcClientInitiatedLogoutSuccessHandler(
                       this.clientRegistrationRepository);

       oidcLogoutSuccessHandler.setPostLogoutRedirectUri(
               URI.create("http://localhost:8080/oauth-login"));

       return oidcLogoutSuccessHandler;
   }
}

```
2. Have a Logout button and redirect it to /logout url

```html
<div style="float:right">
   <form method="post" th:action="@{/logout}"  class="navbar-form navbar-right">
       <button id="logout-button" type="submit" class="btn btn-danger">Logout</button>
   </form>
</div>

```

### Customizing the logout endpoint

1. Have a ConfigSecurity class by extending WebSecurityConfigurerAdapter and configure the logoutUrl
```java


@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

   protected void configure(HttpSecurity http) throws Exception {

       http.authorizeRequests()
               .antMatchers("/oauth-login")
               .permitAll()
               .anyRequest()
               .authenticated()
               .and().oauth2Login().loginPage("/oauth-login")
               .and().logout().logoutUrl("/applogout)
               .logoutSuccessHandler(oidcLogoutSuccessHandler());

   }
@Autowired
   private ClientRegistrationRepository clientRegistrationRepository;

   private LogoutSuccessHandler oidcLogoutSuccessHandler() {
       OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler =
               new OidcClientInitiatedLogoutSuccessHandler(
                       this.clientRegistrationRepository);

       oidcLogoutSuccessHandler.setPostLogoutRedirectUri(
               URI.create("http://localhost:8080/oauth-login"));

       return oidcLogoutSuccessHandler;
   }

}

```
####  Have a Logout button and redirect to custom logout (“/applogout”) url

```html

<div style="float:right">
   <form method="post" th:action="@{/applogout}"  class="navbar-form navbar-right">
       <button id="logout-button" type="submit" class="btn btn-danger">Logout</button>
   </form>
</div>

```

## Read User Information

* You can get the user information from org.springframework.security.core.Authentication, org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser class.

1. Add a method in your controller class to get the user infromation from authentication object.
  
```java

public String getUser(Authentication authentication, Model model) {  
  DefaultOidcUser oidcUser = (DefaultOidcUser) authentication.getPrincipal();
  String username = oidcUser.getName();
  Map<String, Object> getClaims = oidcUser.getClaims()
}
```
