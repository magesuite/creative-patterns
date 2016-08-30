<section class="cc-component-picker | {{ class }}">
    <ul class="cc-component-picker__list" v-if="availableComponents.length">
        <li class="cc-component-picker__list-item cc-component-picker--{{component.type}}" v-for="component in availableComponents">
            <a class="cc-component-picker__component-link" href="#" @click.prevent="onPickComponent( component.type )">
                <figure class="cc-component-picker__component-figure">
                    <img v-bind:src="component.cover" alt="{{ component.coverAlt }}" class="cc-component-picker__component-cover">
                    <figcaption class="cc-component-picker__component-description">{{ component.name }}</figcaption>
                </figure>
            </a>
        </li>
    </ul>
    <p class="cc-component-picker__no-components" v-if="!availableComponents.length">
        No components available.
    </p>
</section>
